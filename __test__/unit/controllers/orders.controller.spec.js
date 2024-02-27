import { beforeEach, expect, jest } from '@jest/globals';
import OrdersController from '../../../src/controllers/orders.controller.js';

let mockOrdersService = {
  order: jest.fn(),
  orderCheck: jest.fn(),
  orderCheckById: jest.fn(),
  orderComplete: jest.fn(),
  orderStatusChange: jest.fn(),
};

let mockRequest;
let mockResponse;
let mockNext;
let ordersController;

describe('OrdersController Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockRequest = {
      body: jest.fn(),
      params: jest.fn(),
      user: jest.fn(),
      query: jest.fn(),
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    mockNext = jest.fn();
    ordersController = new OrdersController(mockOrdersService);
  });

  it('order', async () => {
    const requestBody = {
      storeId: 1,
      menus: 'menus',
    };

    const requestUser = { userId: 1 };

    mockRequest.body = requestBody;
    mockRequest.user = requestUser;

    const responseBody = {
      orderId: 27,
      userId: 1,
      storeId: 1,
      status: 'order',
      totalPrice: 42000,
      createdAt: '2024-02-26T06:08:40.773Z',
    };

    mockOrdersService.order.mockResolvedValue(responseBody);

    await ordersController.order(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: responseBody });
    expect(mockOrdersService.order).toHaveBeenCalledWith(requestUser.userId, requestBody.storeId, requestBody.menus);
  });

  it('ordercheck', async () => {
    let requestQuery = {
      status: 'status',
      value: 'value',
    };
    const requestUser = { userId: 1 };

    mockRequest.query = requestQuery;
    mockRequest.user = requestUser;

    const responseBody = 'orders';

    mockOrdersService.orderCheck.mockResolvedValue(responseBody);

    await ordersController.orderCheck(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: responseBody });
    expect(mockOrdersService.orderCheck).toHaveBeenCalledWith(
      requestUser.userId,
      requestQuery.status,
      requestQuery.value,
      1,
      10
    );
  });

  it('orderCheckById', async () => {
    const requestParams = { orderId: 1 };
    const requestUser = { userId: 1 };

    mockRequest.params = requestParams;
    mockRequest.user = requestUser;

    const responseBody = 'order';

    mockOrdersService.orderCheckById.mockResolvedValue(responseBody);

    await ordersController.orderCheckById(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: responseBody });
    expect(mockOrdersService.orderCheckById).toHaveBeenCalledWith(requestUser.userId, requestParams.orderId);
  });

  it('orderStatuschange', async () => {
    const requestParams = { orderId: 1 };
    const requestUser = { userId: 1 };
    const requestQuery = { status: 'status' };

    mockRequest.params = requestParams;
    mockRequest.user = requestUser;
    mockRequest.query = requestQuery;

    const responseBody = 'order';

    mockOrdersService.orderStatusChange.mockResolvedValue(responseBody);

    await ordersController.orderStatusChange(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: responseBody });
    expect(mockOrdersService.orderStatusChange).toHaveBeenCalledWith(
      requestUser.userId,
      requestParams.orderId,
      requestQuery.status
    );
  });

  it('order Error Case', async () => {
    let requestBody = {
      storeId: 1,
      menus: null,
    };
    const requestUser = { userId: 1 };

    mockRequest.body = requestBody;
    mockRequest.user = requestUser;

    await ordersController.order(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: '주문 정보가 올바르지 않습니다.' });
  });
});
