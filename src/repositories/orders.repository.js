export default class OrdersRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  order = async (userId, storeId, menus) => {
    const menuInfo = [];
    let totalPrice = 0;

    for (let i = 0; i < menus.length; i++) {
      const menu = await this.prisma.menus.findFirst({
        where: {
          AND: [{ storeId: +storeId }, { menuId: +menus[i].menu }],
        },
        select: {
          menuId: true,
          menuName: true,
          price: true,
        },
      });

      if (!menu) throw new Error(`menuId : ${menus[i]} 인 메뉴가 없습니다.`);

      menuInfo.push({ menu: menu, quantity: menus[i].quantity });
    }

    let order;

    await this.prisma.$transaction(async (tx) => {
      order = await tx.orders.create({
        data: {
          storeId: +storeId,
          userId: +userId,
          totalPrice: 0,
        },
      });

      for (let i = 0; i < menuInfo.length; i++) {
        const item = await tx.orderItems.create({
          data: {
            orderId: order.orderId,
            menuId: menuInfo[i].menu.menuId,
            menuName: menuInfo[i].menu.menuName,
            price: menuInfo[i].menu.price,
            quantity: menuInfo[i].quantity,
          },
        });
        totalPrice += item.price * item.quantity;
      }

      order = await tx.orders.update({
        where: { orderId: order.orderId },
        data: {
          totalPrice: totalPrice,
        },
      });
    });

    return order;
  };
}
