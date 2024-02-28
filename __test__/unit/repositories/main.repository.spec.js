import { jest } from '@jest/globals';
import { MainRepository } from '../../../src/repositories/main.repository.js';

let mockPrisma = {
  stores: {
    findMany: jest.fn()
  }
};

let mainRepository = new MainRepository(mockPrisma);

describe('MainRepository Unit Test', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('searchStore', async () => {
    const keyword = 'coffee';

    const mockStores = [{
      storeId: 1,
      storeName: 'Coffee House',
      category: 'Cafe',
      reviews: [
        { rating: 5 },
        { rating: 4 }
      ]
    }];

    mockPrisma.stores.findMany.mockResolvedValue(mockStores);

    const result = await mainRepository.searchStore(keyword);

    expect(result).toEqual([{
      storeId: 1,
      storeName: 'Coffee House',
      category: 'Cafe',
      averageRating: 4.5
    }]);

    expect(mockPrisma.stores.findMany).toHaveBeenCalledWith({
      where: {
        storeName: {
          contains: keyword
        }
      },
      select: {
        storeId: true,
        storeName: true,
        category: true,
        reviews: true
      }
    });
  });

  it('getRanking', async () => {
    const mockStores = [{
      storeId: 1,
      storeName: 'Coffee House',
      category: 'Cafe',
      users: [{
        point: {
          salesAmount: 1000
        }
      }]
    }];

    mockPrisma.stores.findMany.mockResolvedValue(mockStores);

    const result = await mainRepository.getRanking(); //getRanking() -> mockPrisma.stores.findMany 호출

    expect(result).toEqual(mockStores);

    expect(mockPrisma.stores.findMany).toHaveBeenCalledWith({
      select: {
        storeId: true,
        storeName: true,
        category: true,
        users: {
          select: {
            point: {
              select: {
                salesAmount: true
              }
            }
          }
        }
      },
      orderBy: {
        users: {
          point: {
            salesAmount: 'desc'
          }
        }
      }
    });
  });
});
