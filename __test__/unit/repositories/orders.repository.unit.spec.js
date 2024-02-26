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

    const order = {
      orderId: 1,
      userId: 1,
      storeId: 1,
      status: 'order',
      totalPrice: 42000,
      createdAt: '2024-02-26T06:08:40.773Z',
    };





    mockPrisma.menus.findMany.mockResolvedValue(menu);

    mockPrisma.$transaction.mockResolvedValue(order);
    // tx.orders.create.mockResolvedValue(order);

    jest.spyOn(mockPrisma, '$transaction').mockImplementation((callback) => {
      return callback(mockPrisma)
    })

    mockPrisma.orders.create.mockResolvedValue(order);

    for(let i = 0; i < menu.length; i++) {
      const item = {
        orderId: order.orderId,
        menuId: menu[i].menuId,
        menuName: menu[i].menuName,
        price: menu[i].price,
        quantity: menus[i].quantity
      }

      mockPrisma.orderItems.create.mockResolvedValue(item);
    }
    mockPrisma.orders.update.mockResolvedValue(order);

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



    expect(result).toEqual(order);
  });

  it('Menu Error case', async () => {
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
  })
});
