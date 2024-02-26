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
        orderId: 27,
        userId: 1,
        storeId: 1,
        status: 'order',
        totalPrice: 0,
        createdAt: '2024-02-26T06:08:40.773Z',
      };

    const updatedOrder = {
      orderId: 27,
      userId: 1,
      storeId: 1,
      status: 'order',
      totalPrice: 42000,
      createdAt: '2024-02-26T06:08:40.773Z',
    };

    const orderItems = [
        {
            itemId: 1,
            orderId: 1,
            menuId: 1,
            menuName: '1번음식',
            price: 12000,
            quantity: 1
        },
        {
            itemId: 2,
            orderId: 1,
            menuId: 2,
            menuName: '2번음식',
            price: 15000,
            quantity: 2
        },
    ]

    mockPrisma.menus.findMany.mockResolvedValue(menu);

    mockPrisma.$transaction.mockResolvedValue(order);
    mockPrisma.orders.create.mockResolvedValue(order);
    mockPrisma.orderItems.create.mockResolvedValue(orderItems);
    mockPrisma.orders.update.mockResolvedValue(updatedOrder)

    const result = await ordersRepository.order(userId, storeId, menus);
    expect(result).toEqual(updatedOrder);
  });
});
