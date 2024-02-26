import { expect, jest } from '@jest/globals';
import { StoresController } from '../../../src/controllers/stores.controller';

const mockStoresService = {
  createStore: jest.fn(),
  getStores: jest.fn(),
  updateStore: jest.fn(),
  deleteStore: jest.fn(),
};

const mockRequest = {
  body: jest.fn(),
  user: jest.fn(),
  params: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

const mockNext = jest.fn();

const storesController = new StoresController(mockStoresService);

describe('업장 Controller 유닛 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockResponse.status.mockReturnValue(mockResponse);
  });

  test('createStore 함수', async () => {
    const createStoreBody = {
      category: '치킨',
      storeName: '꼬꼬',
      addr: '울산광역시',
      number: '010-0000-0000',
    };
    mockRequest.body = createStoreBody;

    const createStoreUser = {
      userId: 1,
    };
    mockRequest.user = createStoreUser;

    const createStoreReturnValue = {
      storeId: 1,
      ...createStoreUser,
      ...createStoreBody,
      createdAt: new Date().toString,
      updatedAt: new Date().toString,
    };
    mockStoresService.createStore.mockReturnValue(createStoreReturnValue);

    await storesController.createStore(mockRequest, mockResponse, mockNext);

    expect(mockStoresService.createStore).toHaveBeenCalledTimes(1);
    expect(mockStoresService.createStore).toHaveBeenCalledWith(
      createStoreBody.category,
      createStoreBody.storeName,
      createStoreBody.addr,
      createStoreBody.number,
      createStoreUser.userId
    );

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: createStoreReturnValue,
    });
  });

  test('getStores 함수', async () => {
    const getStoresReturnValue = [
      {
        storeId: 1,
        userId: 1,
        category: '치킨',
        storeName: '꼬꼬',
        createdAt: new Date().toString,
        updatedAt: new Date().toString,
        addr: '울산광역시',
        number: '010-0000-0000',
      },
      {
        storeId: 2,
        userId: 2,
        category: '치킨',
        storeName: '꼬꼬',
        createdAt: new Date().toString,
        updatedAt: new Date().toString,
        addr: '울산광역시',
        number: '010-0000-0000',
      },
    ];
    mockStoresService.getStores.mockReturnValue(getStoresReturnValue);

    await storesController.getStores(mockRequest, mockResponse, mockNext);

    expect(mockStoresService.getStores).toHaveBeenCalledTimes(1);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: getStoresReturnValue,
    });
  });

  test('updateStore 함수', async () => {
    const updateStoreBody = {
      category: '치킨',
      storeName: '꽈꽈',
      addr: '울산광역시',
      number: '010-0000-0000',
    };
    mockRequest.body = updateStoreBody;

    const updateStoreUser = {
      userId: 1,
    };
    mockRequest.user = updateStoreUser;

    const updateStoreParams = {
      storeId: 1,
    };
    mockRequest.params = updateStoreParams;

    const updateStoreReturnValue = {
      ...updateStoreParams,
      ...updateStoreUser,
      ...updateStoreBody,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };
    mockStoresService.updateStore.mockReturnValue(updateStoreReturnValue);

    await storesController.updateStore(mockRequest, mockResponse, mockNext);

    expect(mockStoresService.updateStore).toHaveBeenCalledTimes(1);
    expect(mockStoresService.updateStore).toHaveBeenCalledWith(
      updateStoreParams.storeId,
      updateStoreUser.userId,
      updateStoreBody.category,
      updateStoreBody.storeName,
      updateStoreBody.addr,
      updateStoreBody.number
    );

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: updateStoreReturnValue,
    });
  });

  test('deleteStore 함수', async () => {
    const deleteStoreUser = {
      userId: 1,
    };
    mockRequest.user = deleteStoreUser;

    const deleteStoreParams = {
      storeId: 1,
    };
    mockRequest.params = deleteStoreParams;

    const deleteStoreReturnValue = {
      ...deleteStoreParams,
      ...deleteStoreUser,
      category: '치킨',
      storeName: '꽈꽈',
      addr: '울산광역시',
      number: '010-0000-0000',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };
    mockStoresService.deleteStore.mockReturnValue(deleteStoreReturnValue);

    await storesController.deleteStore(mockRequest, mockResponse, mockNext);

    expect(mockStoresService.deleteStore).toHaveBeenCalledTimes(1);
    expect(mockStoresService.deleteStore).toHaveBeenCalledWith(deleteStoreParams.storeId, deleteStoreUser.userId);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: deleteStoreReturnValue,
    });
  });

  test('createStore 함수 실패', async () => {
    mockRequest.body = {
      category: '치킨',
      storeName: '꼬꼬',
    };

    await storesController.createStore(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(new Error('InvalidParamsError'));
  });

  test('updateStore 함수 실패', async () => {
    mockRequest.body = {
      category: '치킨',
      storeName: '꼬꼬',
    };

    await storesController.updateStore(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(new Error('업데이트 할 내용이 없습니다.'));
  });
});
