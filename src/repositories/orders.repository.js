import { OrdersError } from "../exception/orders.exception.error.js";

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

    if (menu.length !== menus.length) throw new OrdersError('메뉴 정보가 올바르지 않습니다.');

    const order = await this.prisma.$transaction(async (tx) => {
      const makeOrder = await tx.orders.create({
        data: {
          storeId: +storeId,
          userId: +userId,
          totalPrice: 0,
        },
      });

      for (let i = 0; i < menu.length; i++) {
        const item = await tx.orderItems.create({
          data: {
            orderId: makeOrder.orderId,
            menuId: menu[i].menuId,
            menuName: menu[i].menuName,
            price: menu[i].price,
            quantity: menuObj[menu[i].menuId],
          },
        });
        totalPrice += item.price * item.quantity;
      }

      const updatedOrder = await tx.orders.update({
        where: { orderId: makeOrder.orderId },
        data: {
          totalPrice: totalPrice,
        },
      });

      const checkPoint = await tx.point.findFirst({
        where: { userId: +userId },
      });
      if (checkPoint.money < totalPrice) throw new Error('금액이 모자랍니다.');

      const updatedPoint = await tx.point.update({
        where: { userId: checkPoint.userId },
        data: { money: checkPoint.money - totalPrice },
      });

      const remainingPoint = updatedPoint.money;

      return { updatedOrder, remainingPoint };
    });

    return order;
  };

  orderCheck = async (userId, status, value, page, perPage) => {
    const store = await this.prisma.stores.findFirst({
      where: { userId: +userId },
    });
    if (!store) throw new OrdersError('운영중인 가게가 없습니다.');

    let orders;

    if (!status) {
      orders = await this.prisma.orders.findMany({
        where: { storeId: store.storeId },
        orderBy: {
          createdAt: value,
        },
        take: +perPage,
        skip: (page - 1) * perPage,
      });
    } else {
      orders = await this.prisma.orders.findMany({
        where: { storeId: store.storeId, status: status },
        orderBy: {
          createdAt: value,
        },
        take: +perPage,
        skip: (page - 1) * perPage,
      });
    }

    return orders;
  };

  orderCheckById = async (userId, orderId) => {
    const order = await this.prisma.orders.findFirst({
      where: { orderId: +orderId },
    });

    if (!order) throw new OrdersError('존재하지 않는 주문 내역입니다.');

    if (order.userId !== userId) {
      const store = await this.prisma.stores.findFirst({
        where: { storeId: order.storeId },
      });
      if (store.userId !== userId) throw new OrdersError('열람 권한이 없습니다.');
    }

    return order;
  };

  orderStatusChange = async (userId, orderId, status) => {
    let updatedOrder;

    const order = await this.prisma.orders.findFirst({
      where: { orderId: +orderId },
    });

    if (!order) throw new OrdersError('존재하지 않는 주문 내역입니다.');

    const store = await this.prisma.stores.findFirst({
      where: { userId: +userId },
    });
    if (!store || (userId !== store.userId)) throw new OrdersError('권한이 없습니다.');

    if (status === 'success') {
      if (order.status === 'success') throw new OrdersError('완료된 주문입니다.');

      updatedOrder = await this.prisma.$transaction(async (tx) => {
        const order = await tx.orders.update({
          where: { orderId: +orderId },
          data: {
            status: status,
          },
        });

        const point = await tx.point.findFirst({
          where: { userId: +userId },
        });

        let updatedPoint;

        if (userId === order.userId) {
          updatedPoint = await tx.point.update({
            where: { userId: +userId },
            data: {
              money: point.money + order.totalPrice,
            },
          });
        } else {
          updatedPoint = await tx.point.update({
            where: { userId: +userId },
            data: {
              money: point.money + order.totalPrice,
              salesAmount: point.salesAmount + order.totalPrice,
            },
          });
        }

        return { order, updatedPoint };
      });
    } else {
      updatedOrder = await this.prisma.orders.update({
        where: { orderId: +orderId },
        data: {
          status: status,
        },
      });
    }
    return updatedOrder;
  };
}
