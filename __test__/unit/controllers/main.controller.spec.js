import { jest } from '@jest/globals';
import { MainController } from '../../../src/controllers/main.controller.js';

let mockMainService = {
  searchStore: jest.fn(),
  getRanking: jest.fn()
};

const mockRequest = {
  query: jest.fn()
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn()
};

const mockNext = jest.fn();

let mainController = new MainController(mockMainService);

describe('MainController Unit Test', () => {

  beforeEach(() => {
    jest.resetAllMocks(); 
    mockResponse.status.mockReturnValue(mockResponse);
  });
  
  it('searchStore', async() => {
    //request
    const requestQuery = {
      keyword: 'coffee',
    };

    mockRequest.query = requestQuery;

    //response
    const responseBody = [{ 
      storeId: 1,
      storeName: 'storeName',
      rating: 4.5
    }];

    mockMainService.searchStore.mockReturnValue(responseBody);

    //expect
    await mainController.searchStore(mockRequest, mockResponse, mockNext);
    expect(mockMainService.searchStore).toHaveBeenCalledWith('coffee');
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: responseBody
    });
  });

  it('getRanking', async() => {
    //response
    const responseBody = [{ 
      storeId: 1,
      storeName: 'storeName',
      rating: 4.5
    }];

    mockMainService.getRanking.mockReturnValue(responseBody);

    //expect
    await mainController.getRanking(mockRequest, mockResponse, mockNext);
    expect(mockMainService.getRanking).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: responseBody
    });
  });
});
