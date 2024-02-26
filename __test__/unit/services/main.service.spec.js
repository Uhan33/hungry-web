import { jest } from '@jest/globals';
import { MainService } from '../../../src/services/main.service.js';

let mockMainRepository = {
  searchStore: jest.fn(),
  getRanking: jest.fn()
};

let mainService = new MainService(mockMainRepository);

describe('MainService Unit Test', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('searchStore', async () => {
    const keyword = 'coffee';

    const expectedStores = [{
      storeId: 1,
      storeName: 'storeName',
      rating: 4.5
    }];

    mockMainRepository.searchStore.mockResolvedValue(expectedStores);

    const result = await mainService.searchStore(keyword);
    expect(result).toEqual(expectedStores);
    expect(mockMainRepository.searchStore).toHaveBeenCalledWith(keyword);
  });

  it('getRanking', async () => {
    const expectedStores = [{
      storeId: 1,
      storeName: 'storeName',
      rating: 4.5
    }];

    mockMainRepository.getRanking.mockResolvedValue(expectedStores);

    const result = await mainService.getRanking();
    expect(result).toEqual(expectedStores);
    expect(mockMainRepository.getRanking).toHaveBeenCalled();
  });
});
