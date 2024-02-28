import { jest } from '@jest/globals';
import OrdersRepository from '../../../src/repositories/orders.repository.js';

let mockPrisma = {
  orders: {
    create: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  orderItems: {
    create: jest.fn(),
  },
  menus: {
    findMany: jest.fn(),
  },
  stores: {
    findFirst: jest.fn(),
  },
  point: {
    findFirst: jest.fn(),
    update: jest.fn(),
  },
  $transaction: jest.fn(),
};

let ordersRepository;

describe('OrdersRepository Unit Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    ordersRepository = new OrdersRepository(mockPrisma);
  });

  it('order', async () => {
    const userId = 1;
    const storeId = 1;
    const menus = [
      { menu: 1, quantity: 1 },
      { menu: 2, quantity: 2 },
    ];
    const menu = [
      {
        menuId: 1,
        menuName: '1번음식',
        price: 12000,
      },
      {
        menuId: 2,
        menuName: '2번음식',
        price: 15000,
      },
    ];

    const updatedOrder = {
      orderId: 1,
      userId: 1,
      storeId: 1,
      status: 'order',
      totalPrice: 42000,
      createdAt: '2024-02-26T06:08:40.773Z',
    };

    const remainingPoint = 958000;

    const orderData = { updatedOrder, remainingPoint };

    const point = {
      money: 1000000,
    };

    mockPrisma.menus.findMany.mockResolvedValue(menu);

    mockPrisma.$transaction.mockResolvedValue(orderData);

    jest.spyOn(mockPrisma, '$transaction').mockImplementation((callback) => {
      return callback(mockPrisma);
    });

    mockPrisma.orders.create.mockResolvedValue(updatedOrder);

    for (let i = 0; i < menu.length; i++) {
      const item = {
        orderId: updatedOrder.orderId,
        menuId: menu[i].menuId,
        menuName: menu[i].menuName,
        price: menu[i].price,
        quantity: menus[i].quantity,
      };

      mockPrisma.orderItems.create.mockResolvedValue(item);
    }
    mockPrisma.orders.update.mockResolvedValue(updatedOrder);

    mockPrisma.point.findFirst.mockResolvedValue(point);

    mockPrisma.point.update.mockResolvedValue({ money: point.money - updatedOrder.totalPrice });

    const result = await ordersRepository.order(userId, storeId, menus);

    expect(mockPrisma.menus.findMany).toHaveBeenCalledTimes(1);
    expect(mockPrisma.menus.findMany).toHaveBeenCalledWith({
      where: {
        AND: [{ storeId: +storeId }, { menuId: { in: menus.map((e) => e.menu) } }],
      },
      select: {
        menuId: true,
        menuName: true,
        price: true,
      },
    });
    expect(mockPrisma.$transaction).toHaveBeenCalledTimes(1);

    expect(result).toEqual(orderData);
  });

  it('orderCheck', async () => {
    const userId = 1;
    const status = 'order';
    const value = 'desc';
    const page = 1;
    const perPage = 10;

    const store = {
      storeId: 1,
      userId: 1,
      category: '한식',
      storeName: '식당',
      number: 'number',
      addr: 'addr',
      createdAt: '2024-02-26T06:08:40.773Z',
      updatedAt: '2024-02-26T06:08:40.773Z',
    };

    const orders = [
      {
        orderId: 6,
        userId: 1,
        storeId: 1,
        status: 'order',
        totalPrice: 24000,
        createdAt: '2024-02-26T04:27:46.454Z',
      },
      {
        orderId: 7,
        userId: 1,
        storeId: 1,
        status: 'order',
        totalPrice: 24000,
        createdAt: '2024-02-26T04:27:46.454Z',
      },
    ];

    const orders2 = [
      {
        orderId: 6,
        userId: 1,
        storeId: 1,
        status: 'order',
        totalPrice: 24000,
        createdAt: '2024-02-26T04:27:46.454Z',
      },
      {
        orderId: 7,
        userId: 1,
        storeId: 1,
        status: 'cancel',
        totalPrice: 24000,
        createdAt: '2024-02-26T04:27:46.454Z',
      },
    ];

    mockPrisma.stores.findFirst.mockResolvedValue(store);
    mockPrisma.orders.findMany.mockResolvedValue(orders);

    const result = await ordersRepository.orderCheck(userId, status, value, page, perPage);

    expect(result).toEqual(orders);
    expect(mockPrisma.stores.findFirst).toHaveBeenCalledTimes(1);
    expect(mockPrisma.orders.findMany).toHaveBeenCalledTimes(1);

    jest.clearAllMocks();

    mockPrisma.stores.findFirst.mockResolvedValue(store);
    mockPrisma.orders.findMany.mockResolvedValue(orders2);

    const result2 = await ordersRepository.orderCheck(userId, null, value, page, perPage);

    expect(result2).toEqual(orders2);
    expect(mockPrisma.stores.findFirst).toHaveBeenCalledTimes(1);
    expect(mockPrisma.orders.findMany).toHaveBeenCalledTimes(1);
  });

  it('orderCheckById', async () => {
    const userId = 1;
    const orderId = 2;
    const order = {
      orderId: 2,
      userId: 1,
      storeId: 1,
      status: 'order',
      totalPrice: 24000,
      createdAt: '2024-02-26T04:27:46.454Z',
    };

    const store = {
      storeId: 1,
      userId: 10,
      category: '한식',
      storeName: '식당',
      number: 'number',
      addr: 'addr',
      createdAt: '2024-02-26T06:08:40.773Z',
      updatedAt: '2024-02-26T06:08:40.773Z',
    };

    mockPrisma.orders.findFirst.mockResolvedValue(order);
    mockPrisma.stores.findFirst.mockResolvedValue(store);

    const result = await ordersRepository.orderCheckById(userId, orderId);

    expect(result).toEqual(order);
    expect(mockPrisma.orders.findFirst).toHaveBeenCalledTimes(1);
    expect(mockPrisma.orders.findFirst).toHaveBeenCalledWith({ where: { orderId: +orderId } });

    jest.clearAllMocks();

    mockPrisma.orders.findFirst.mockResolvedValue(order);
    mockPrisma.stores.findFirst.mockResolvedValue(store);

    const result2 = await ordersRepository.orderCheckById(10, orderId);
    expect(result2).toEqual(order);
    expect(mockPrisma.orders.findFirst).toHaveBeenCalledTimes(1);
    expect(mockPrisma.orders.findFirst).toHaveBeenCalledWith({ where: { orderId: +orderId } });
    expect(mockPrisma.stores.findFirst).toHaveBeenCalledTimes(1);
    expect(mockPrisma.stores.findFirst).toHaveBeenCalledWith({ where: { storeId: order.storeId } });
  });

  it('orderStatusChange', async () => {
    const userId = 1;
    const orderId = 1;
    const status = 'success';

    let pevOrder = {
      orderId: 1,
      userId: 2,
      storeId: 1,
      status: 'order',
      totalPrice: 24000,
      createdAt: '2024-02-26T04:27:46.454Z',
    };

    const store = {
      storeId: 1,
      userId: 1,
    };

    let order = {
      orderId: 1,
      userId: 2,
      storeId: 1,
      status: status,
      totalPrice: 24000,
      createdAt: '2024-02-26T04:27:46.454Z',
    };

    const point = {
      money: 1000000,
      salesAmount: 0,
    };

    const updatedPoint = {
      money: 1024000,
      salesAmount: 24000,
    };

    mockPrisma.orders.findFirst.mockResolvedValue(pevOrder);
    mockPrisma.stores.findFirst.mockResolvedValue(store);
    mockPrisma.$transaction.mockResolvedValue({ order, updatedPoint });

    jest.spyOn(mockPrisma, '$transaction').mockImplementation((callback) => {
      return callback(mockPrisma);
    });

    mockPrisma.orders.update.mockResolvedValue(order);
    mockPrisma.point.findFirst.mockResolvedValue(point);
    mockPrisma.point.update.mockResolvedValue(updatedPoint);

    let result = await ordersRepository.orderStatusChange(userId, orderId, status);

    expect(result).toEqual({ order, updatedPoint });

    jest.clearAllMocks();

    pevOrder = {
      orderId: 1,
      userId: 1,
      storeId: 1,
      status: 'order',
      totalPrice: 24000,
      createdAt: '2024-02-26T04:27:46.454Z',
    };

    order = {
      orderId: 1,
      userId: 1,
      storeId: 1,
      status: 'success',
      totalPrice: 24000,
      createdAt: '2024-02-26T04:27:46.454Z',
    };

    mockPrisma.orders.findFirst.mockResolvedValue(pevOrder);
    mockPrisma.stores.findFirst.mockResolvedValue(store);
    mockPrisma.$transaction.mockResolvedValue({ order, updatedPoint });

    jest.spyOn(mockPrisma, '$transaction').mockImplementation((callback) => {
      return callback(mockPrisma);
    });

    mockPrisma.orders.update.mockResolvedValue(order);
    mockPrisma.point.findFirst.mockResolvedValue(point);
    mockPrisma.point.update.mockResolvedValue(updatedPoint);

    result = await ordersRepository.orderStatusChange(userId, orderId, status);
    expect(result).toEqual({ order, updatedPoint });

    jest.clearAllMocks();

    pevOrder = {
      orderId: 1,
      userId: 2,
      storeId: 1,
      status: 'order',
      totalPrice: 24000,
      createdAt: '2024-02-26T04:27:46.454Z',
    };

    order = {
      orderId: 1,
      userId: 2,
      storeId: 1,
      status: 'delivering',
      totalPrice: 24000,
      createdAt: '2024-02-26T04:27:46.454Z',
    };

    mockPrisma.orders.findFirst.mockResolvedValue(pevOrder);

    mockPrisma.stores.findFirst.mockResolvedValue(store);

    mockPrisma.orders.update.mockResolvedValue(order);

    result = await ordersRepository.orderStatusChange(userId, orderId, order.status);

    expect(result).toEqual(order);
  });

  it('order Error case', async () => {
    const userId = 1;
    const storeId = 1;
    const menus = [
      { menu: 1, quantity: 1 },
      { menu: 2, quantity: 2 },
    ];
    let menu = [
      {
        menuId: 1,
        menuName: '1번음식',
        price: 12000,
      },
    ];
    const order = {
      orderId: 27,
      userId: 1,
      storeId: 1,
      status: 'order',
      totalPrice: 42000,
      createdAt: '2024-02-26T06:08:40.773Z',
    };

    mockPrisma.menus.findMany.mockResolvedValue(menu);

    mockPrisma.$transaction.mockResolvedValue(order);

    await expect(async () => {
      await ordersRepository.order(userId, storeId, menus);
    }).rejects.toThrowError('메뉴 정보가 올바르지 않습니다.');

    jest.resetAllMocks();

    menu = [
      {
        menuId: 1,
        menuName: '1번음식',
        price: 12000,
      },
      {
        menuId: 2,
        menuName: '1번음식',
        price: 15000,
      },
    ];

    mockPrisma.menus.findMany.mockResolvedValue(menu);

    mockPrisma.$transaction.mockResolvedValue(order);

    jest.spyOn(mockPrisma, '$transaction').mockImplementation((callback) => {
      return callback(mockPrisma);
    });

    mockPrisma.orders.create.mockResolvedValue(order);

    for (let i = 0; i < menu.length; i++) {
      const item = {
        orderId: order.orderId,
        menuId: menu[i].menuId,
        menuName: menu[i].menuName,
        price: menu[i].price,
        quantity: menus[i].quantity,
      };

      mockPrisma.orderItems.create.mockResolvedValue(item);
    }
    mockPrisma.orders.update.mockResolvedValue(order);

    mockPrisma.point.findFirst.mockResolvedValue({ money: 0 });

    await expect(async () => {
      await ordersRepository.order(userId, storeId, menus);
    }).rejects.toThrowError('금액이 모자랍니다.');
  });

  it('orderCheck Error Case', async () => {
    const store = null;

    mockPrisma.stores.findFirst.mockResolvedValue(store);

    await expect(async () => {
      await ordersRepository.orderCheck(1, 'status', 'value', 1, 10);
    }).rejects.toThrowError('운영중인 가게가 없습니다.');
  });

  it('orderCheckById Error Case', async () => {
    let order = null;
    mockPrisma.orders.findFirst.mockResolvedValue(order);

    await expect(async () => {
      await ordersRepository.orderCheckById(1, 1);
    }).rejects.toThrowError('존재하지 않는 주문 내역입니다.');

    jest.clearAllMocks();

    order = {
      orderId: 1,
      userId: 1,
      storeId: 1,
      status: 'order',
      totalPrice: 24000,
      createdAt: '2024-02-26T04:27:46.454Z',
    };

    const store = {
      storeId: 2,
      userId: 2,
      category: '한식',
      storeName: '식당',
      number: 'number',
      addr: 'addr',
      createdAt: '2024-02-26T06:08:40.773Z',
      updatedAt: '2024-02-26T06:08:40.773Z',
    };

    mockPrisma.orders.findFirst.mockResolvedValue(order);

    mockPrisma.stores.findFirst.mockResolvedValue(store);

    await expect(async () => {
      await ordersRepository.orderCheckById(3, 1);
    }).rejects.toThrowError('열람 권한이 없습니다.');
  });

  it('orderStatusChange Error Case', async () => {
    let order = null;

    mockPrisma.orders.findFirst.mockResolvedValue(order);

    await expect(async () => {
      await ordersRepository.orderStatusChange(1, 1, 'status');
    }).rejects.toThrowError('존재하지 않는 주문 내역입니다.');

    jest.resetAllMocks();

    order = {
      orderId: 1,
      userId: 1,
      storeId: 1,
      status: 'order',
      totalPrice: 24000,
      createdAt: '2024-02-26T04:27:46.454Z',
    };

    const store = {
      storeId: 1,
      userId: 1,
    };

    mockPrisma.orders.findFirst.mockResolvedValue(order);

    mockPrisma.stores.findFirst.mockResolvedValue(store);

    await expect(async () => {
      await ordersRepository.orderStatusChange(2, 1, order.status);
    }).rejects.toThrowError('권한이 없습니다.');

    jest.resetAllMocks();

    order = {
      orderId: 1,
      userId: 1,
      storeId: 1,
      status: 'success',
      totalPrice: 24000,
      createdAt: '2024-02-26T04:27:46.454Z',
    };

    mockPrisma.orders.findFirst.mockResolvedValue(order);

    mockPrisma.stores.findFirst.mockResolvedValue(store);
    await expect(async () => {
      await ordersRepository.orderStatusChange(order.userId, order.orderId, order.status);
    }).rejects.toThrowError('완료된 주문입니다.');
  });
});
