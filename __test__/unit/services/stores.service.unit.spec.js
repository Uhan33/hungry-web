import { jest } from '@jest/globals';
import { StoresService } from '../../../src/services/stores.service';

let mockStoresRepository = {
  createStore: jest.fn(),
  getStores: jest.fn(),
  getStore: jest.fn(),
  updateStore: jest.fn(),
  deleteStore: jest.fn(),
};

let storesService = new StoresService(mockStoresRepository);

describe('업장 Service 유닛 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('createStore 함수', async () => {
    const sampleStore = {
      storeId: 1,
      userId: 1,
      category: '치킨',
      storeName: '꼬꼬',
      createdAt: '2024-02-20T13:56:48.431Z',
      updatedAt: '2024-02-20T13:56:48.431Z',
      addr: '울산광역시',
      number: '010-0000-0000',
    };
    mockStoresRepository.createStore.mockReturnValue(sampleStore);

    const createStore = await storesService.createStore('치킨', '꼬꼬', '울산광역시', '010-0000-0000', 1);
    expect(createStore).toEqual(sampleStore);

    expect(mockStoresRepository.createStore).toHaveBeenCalledTimes(1);
    expect(mockStoresRepository.createStore).toHaveBeenCalledWith(
      sampleStore.category,
      sampleStore.storeName,
      sampleStore.addr,
      sampleStore.number,
      sampleStore.userId
    );
  });

  test('getStores 함수', async () => {
    const sampleStores = [
      {
        storeId: 1,
        userId: 1,
        category: '치킨',
        storeName: '꼬꼬',
        createdAt: '2024-02-20T13:56:48.431Z',
        updatedAt: '2024-02-20T13:56:48.431Z',
        addr: '울산광역시',
        number: '010-0000-0000',
      },
      {
        storeId: 2,
        userId: 2,
        category: '치킨',
        storeName: '꼬꼬',
        createdAt: '2024-02-21T13:56:48.431Z',
        updatedAt: '2024-02-21T13:56:48.431Z',
        addr: '울산광역시',
        number: '010-0000-0000',
      },
    ];
    mockStoresRepository.getStores.mockReturnValue(sampleStores);

    const Stores = await storesService.getStores();
    expect(Stores).toEqual(sampleStores);

    expect(mockStoresRepository.getStores).toHaveBeenCalledTimes(1);
  });

  test('updateStore 함수', async () => {
    const sampleStore = {
      storeId: 1,
      userId: 1,
      category: '치킨',
      storeName: '꽈꽈',
      createdAt: '2024-02-20T13:56:48.431Z',
      updatedAt: '2024-02-20T13:56:48.431Z',
      addr: '울산광역시',
      number: '010-0000-0000',
    };
    mockStoresRepository.updateStore.mockReturnValue(sampleStore);
    mockStoresRepository.getStore.mockReturnValue(sampleStore);

    const updateStore = await storesService.updateStore(1, 1, '치킨', '꽈꽈', '울산광역시', '010-0000-0000');
    expect(updateStore).toEqual(sampleStore);

    expect(mockStoresRepository.getStore).toHaveBeenCalledTimes(1);
    expect(mockStoresRepository.getStore).toHaveBeenCalledWith(sampleStore.storeId);

    expect(mockStoresRepository.updateStore).toHaveBeenCalledTimes(1);
    expect(mockStoresRepository.updateStore).toHaveBeenCalledWith(
      sampleStore.storeId,
      sampleStore.userId,
      sampleStore.category,
      sampleStore.storeName,
      sampleStore.addr,
      sampleStore.number
    );
  });

  test('deleteStore 함수', async () => {
    const sampleStore = {
      storeId: 1,
      userId: 1,
      category: '치킨',
      storeName: '꽈꽈',
      createdAt: '2024-02-20T13:56:48.431Z',
      updatedAt: '2024-02-20T13:56:48.431Z',
      addr: '울산광역시',
      number: '010-0000-0000',
    };
    mockStoresRepository.deleteStore.mockReturnValue(sampleStore);
    mockStoresRepository.getStore.mockReturnValue(sampleStore);

    const deleteStore = await storesService.deleteStore(1, 1);
    expect(deleteStore).toEqual(sampleStore);

    expect(mockStoresRepository.getStore).toHaveBeenCalledTimes(1);
    expect(mockStoresRepository.getStore).toHaveBeenCalledWith(sampleStore.storeId);

    expect(mockStoresRepository.deleteStore).toHaveBeenCalledTimes(1);
    expect(mockStoresRepository.deleteStore).toHaveBeenCalledWith(sampleStore.storeId, sampleStore.userId);
  });

  test('updateStore 함수 실패', async () => {
    const sampleStore = null;
    mockStoresRepository.getStore.mockReturnValue(sampleStore);

    try {
      await storesService.updateStore(1, 1, '치킨', '꽈꽈', '울산광역시', '010-0000-0000');
    } catch (err) {
      expect(mockStoresRepository.getStore).toHaveBeenCalledTimes(1);
      expect(mockStoresRepository.getStore).toHaveBeenCalledWith(1);

      expect(mockStoresRepository.updateStore).toHaveBeenCalledTimes(0);
      expect(err.message).toEqual('존재하지 않는 업장입니다.');
    }
  });

  test('deleteStore 함수 실패', async () => {
    const sampleStore = null;
    mockStoresRepository.getStore.mockReturnValue(sampleStore);

    try {
      await storesService.deleteStore(1, 1);
    } catch (err) {
      expect(mockStoresRepository.getStore).toHaveBeenCalledTimes(1);
      expect(mockStoresRepository.getStore).toHaveBeenCalledWith(1);

      expect(mockStoresRepository.deleteStore).toHaveBeenCalledTimes(0);
      expect(err.message).toEqual('존재하지 않는 업장입니다.');
    }
  });
});
