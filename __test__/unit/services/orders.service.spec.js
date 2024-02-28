import { jest } from '@jest/globals';
import OrdersService from '../../../src/services/orders.service.js';

let mockOrdersRepository = {
  order: jest.fn(),
  orderCheck: jest.fn(),
  orderCheckById: jest.fn(),
  orderStatusChange: jest.fn(),
};

let ordersService;

describe('OrdersService Unit Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    ordersService = new OrdersService(mockOrdersRepository);
  });

  it('order', async () => {
    const userId = 1;
    const storeId = 1;
    const menus = [
      { menu: 1, quantity: 1 },
      { menu: 2, quantity: 2 },
    ];

    const expectedOrder = {
      orderId: 1,
      userId: 1,
      storeId: 1,
      status: 'order',
      totalPrice: 42000,
      createdAt: '2024-02-26T06:08:40.773Z',
    };

    mockOrdersRepository.order.mockResolvedValue(expectedOrder);

    const result = await ordersService.order(userId, storeId, menus);

    expect(result).toEqual(expectedOrder);
    expect(mockOrdersRepository.order).toHaveBeenCalledWith(userId, storeId, menus);
  });

  it('orderCheck', async () => {
    const userId = 1;
    let status = null;
    let value = null;
    const page = 1;
    const perPage = 10;

    const expectedOrder = 'expectedOrder';

    mockOrdersRepository.orderCheck.mockResolvedValue(expectedOrder);
    let result = await ordersService.orderCheck(userId, status, value, page, perPage);
    expect(mockOrdersRepository.orderCheck).toHaveBeenCalledWith(userId, status, 'desc', page, perPage);
    expect(result).toEqual(expectedOrder);

    jest.resetAllMocks();
    ordersService = new OrdersService(mockOrdersRepository);

    status = 'order'; value = 'desc';
    mockOrdersRepository.orderCheck.mockResolvedValue(expectedOrder);
    result = await ordersService.orderCheck(userId, status, value, page, perPage);
    expect(mockOrdersRepository.orderCheck).toHaveBeenCalledWith(userId, 'order', 'desc', page, perPage);
    expect(result).toEqual(expectedOrder);

    jest.resetAllMocks();
    ordersService = new OrdersService(mockOrdersRepository);

    status = 'delivering'; value = 'asc';
    mockOrdersRepository.orderCheck.mockResolvedValue(expectedOrder);
    result = await ordersService.orderCheck(userId, status, value, page, perPage);
    expect(mockOrdersRepository.orderCheck).toHaveBeenCalledWith(userId, 'delivering', 'asc', page, perPage);
    expect(result).toEqual(expectedOrder);

    jest.resetAllMocks();
    ordersService = new OrdersService(mockOrdersRepository);

    status = 'success'; value = 'notValue';
    mockOrdersRepository.orderCheck.mockResolvedValue(expectedOrder);
    result = await ordersService.orderCheck(userId, status, value, page, perPage);
    expect(mockOrdersRepository.orderCheck).toHaveBeenCalledWith(userId, 'success', 'desc', page, perPage);
    expect(result).toEqual(expectedOrder);

    jest.resetAllMocks();
    ordersService = new OrdersService(mockOrdersRepository);

    status = 'cancel'; value = 'ASC';
    mockOrdersRepository.orderCheck.mockResolvedValue(expectedOrder);
    result = await ordersService.orderCheck(userId, status, value, page, perPage);
    expect(mockOrdersRepository.orderCheck).toHaveBeenCalledWith(userId, 'cancel', 'asc', page, perPage);
    expect(result).toEqual(expectedOrder);
  });

  it('orderCheckById', async () => {
    const userId = 1;
    const orderId = 1;

    const expectedOrder = 'expectedOrder';

    mockOrdersRepository.orderCheckById.mockResolvedValue(expectedOrder);

    const result = await ordersService.orderCheckById(userId, orderId);

    expect(mockOrdersRepository.orderCheckById).toHaveBeenCalledWith(userId, orderId);
    expect(result).toEqual(expectedOrder);
  });

  it('orderStatusChange', async () => {
    const userId = 1;
    const orderId = 1;
    let status = 'order';

    const expectedOrder = 'expectedOrder';

    mockOrdersRepository.orderStatusChange.mockResolvedValue(expectedOrder);
    let result = await ordersService.orderStatusChange(userId, orderId, status);
    expect(mockOrdersRepository.orderStatusChange).toHaveBeenCalledWith(userId, orderId, status);
    expect(result).toEqual(expectedOrder);

    jest.resetAllMocks();
    ordersService = new OrdersService(mockOrdersRepository);

    status = 'delivering';
    mockOrdersRepository.orderStatusChange.mockResolvedValue(expectedOrder);
    result = await ordersService.orderStatusChange(userId, orderId, status);
    expect(mockOrdersRepository.orderStatusChange).toHaveBeenCalledWith(userId, orderId, status);
    expect(result).toEqual(expectedOrder);

    jest.resetAllMocks();
    ordersService = new OrdersService(mockOrdersRepository);

    status = 'success';
    mockOrdersRepository.orderStatusChange.mockResolvedValue(expectedOrder);
    result = await ordersService.orderStatusChange(userId, orderId, status);
    expect(mockOrdersRepository.orderStatusChange).toHaveBeenCalledWith(userId, orderId, status);
    expect(result).toEqual(expectedOrder);

    jest.resetAllMocks();
    ordersService = new OrdersService(mockOrdersRepository);

    status = 'cancel';
    mockOrdersRepository.orderStatusChange.mockResolvedValue(expectedOrder);
    result = await ordersService.orderStatusChange(userId, orderId, status);
    expect(mockOrdersRepository.orderStatusChange).toHaveBeenCalledWith(userId, orderId, status);
    expect(result).toEqual(expectedOrder);
  });

  it('orderStatuschange Error Case', async () => {
    const userId = 1;
    const orderId = 1;
    const status = null;

    await expect(async () => {
      await ordersService.orderStatusChange(userId, orderId, status);
    }).rejects.toThrowError('요청 상태가 올바르지 않습니다.');
  });
});
