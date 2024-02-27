import { jest } from '@jest/globals';
import { StoresRepository } from '../../../src/repositories/stores.repository.js';

let mockPrisma = {
  stores: {
    create: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

let storesRepository = new StoresRepository(mockPrisma);

describe('업장 Repository 유닛 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('createStore 함수', async () => {
    const mockReturn = 'create String';
    mockPrisma.stores.create.mockReturnValue(mockReturn);

    const createStoreParams = {
      category: 'createStoreCategory',
      storeName: 'createStoreStoreName',
      addr: 'createStoreAddr',
      number: 'createStoreNumber',
      userId: 'createStoreUserId',
    };

    const createdStoreData = await storesRepository.createStore(
      createStoreParams.category,
      createStoreParams.storeName,
      createStoreParams.addr,
      createStoreParams.number,
      createStoreParams.userId
    );
    expect(createdStoreData).toEqual(mockReturn);

    expect(mockPrisma.stores.create).toHaveBeenCalledTimes(1);
    expect(mockPrisma.stores.create).toHaveBeenCalledWith({
      data: {
        category: createStoreParams.category,
        storeName: createStoreParams.storeName,
        addr: createStoreParams.addr,
        number: createStoreParams.number,
        userId: createStoreParams.userId,
      },
    });
  });

  test('getStores 함수', async () => {
    const mockReturn = 'findMany String';
    mockPrisma.stores.findMany.mockReturnValue(mockReturn);

    const Stores = await storesRepository.getStores();
    expect(Stores).toEqual(mockReturn);

    expect(mockPrisma.stores.findMany).toHaveBeenCalledTimes(1);
  });

  test('getStore 함수', async () => {
    const mockReturn = 'findFirst String';
    mockPrisma.stores.findFirst.mockReturnValue(mockReturn);

    const getStoreParams = {
      storeId: 'getStorestoreId',
    };

    const getStoreData = await storesRepository.getStore(getStoreParams.storeId);
    expect(getStoreData).toEqual(mockReturn);

    expect(mockPrisma.stores.findFirst).toHaveBeenCalledTimes(1);
    expect(mockPrisma.stores.findFirst).toHaveBeenCalledWith({
      where: { storeId: +getStoreParams.storeId },
    });
  });

  test('updateStore 함수', async () => {
    const mockReturn = 'update String';
    mockPrisma.stores.update.mockReturnValue(mockReturn);

    const updateStoreParams = {
      storeId: 'updateStorestoreId',
      userId: 'updateStoreuserId',
      category: 'updateStorecategory',
      storeName: 'updateStorestoreName',
      addr: 'updateStoreaddr',
      number: 'updateStorenumber',
    };

    const updateStoreData = await storesRepository.updateStore(
      updateStoreParams.storeId,
      updateStoreParams.userId,
      updateStoreParams.category,
      updateStoreParams.storeName,
      updateStoreParams.addr,
      updateStoreParams.number
    );
    expect(updateStoreData).toEqual(mockReturn);

    expect(mockPrisma.stores.update).toHaveBeenCalledTimes(1);
    expect(mockPrisma.stores.update).toHaveBeenCalledWith({
      where: { storeId: +updateStoreParams.storeId, userId: +updateStoreParams.userId },
      data: {
        category: updateStoreParams.category,
        storeName: updateStoreParams.storeName,
        addr: updateStoreParams.addr,
        number: updateStoreParams.number,
      },
    });
  });

  test('deleteStore 함수', async () => {
    const mockReturn = 'delete String';
    mockPrisma.stores.delete.mockReturnValue(mockReturn);

    const deleteStoreParams = {
      storeId: 'deleteStorestoreId',
      userId: 'deleteStoreuserId',
    };

    const deleteStoreData = await storesRepository.deleteStore(deleteStoreParams.storeId, deleteStoreParams.userId);
    expect(deleteStoreData).toEqual(mockReturn);

    expect(mockPrisma.stores.delete).toHaveBeenCalledTimes(1);
    expect(mockPrisma.stores.delete).toHaveBeenCalledWith({
      where: { storeId: +deleteStoreParams.storeId, userId: +deleteStoreParams.userId },
    });
  });
});
