export default class OrdersRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  order = async (userId, storeId, menus) => {
    let totalPrice = 0;
    let menuObj = {};
    menus.map((e) => {
      menuObj[e.menu] = e.quantity;
    });

    const menu = await this.prisma.menus.findMany({
      where: {
        AND: [{ storeId: +storeId }, { menuId: { in: menus.map((e) => e.menu) } }],
      },
      select: {
        menuId: true,
        menuName: true,
        price: true,
      },
    });

    if (menu.length !== menus.length) throw new Error('메뉴 정보가 올바르지 않습니다.');

    let order;

    await this.prisma.$transaction(async (tx) => {
      order = await tx.orders.create({
        data: {
          storeId: +storeId,
          userId: +userId,
          totalPrice: 0,
        },
      });

      for (let i = 0; i < menu.length; i++) {
        const item = await tx.orderItems.create({
          data: {
            orderId: order.orderId,
            menuId: menu[i].menuId,
            menuName: menu[i].menuName,
            price: menu[i].price,
            quantity: menuObj[menu[i].menuId],
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
