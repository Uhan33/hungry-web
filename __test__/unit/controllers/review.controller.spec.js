// __tests__/unit/posts.repository.unit.spec.js

import { jest } from '@jest/globals';
import { ReviewController } from '../../../src/controllers/review.controller.js';

let mockReviewService = {
  createReview: jest.fn(),
  getReview: jest.fn(),
  updateReview: jest.fn(),
  deleteReview: jest.fn(),
  getReviewByStoreId: jest.fn()
};

const mockRequest = {
  body: jest.fn(),
  params: jest.fn(),
  user: jest.fn(),
  query: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

const mockNext = jest.fn();

let reviewController = new ReviewController(mockReviewService);

describe('ReviewController Unit Test', () => {

  beforeEach(() => {
    jest.resetAllMocks(); 
    mockResponse.status.mockReturnValue(mockResponse);
  });
  
  it('createReview', async() => {

    //request
    const requestBody = {
      reviewContent : 'reviewContent',
      rating : 4
    };

    const requestQuery = {
      storeId : 1,
    };

    const user = { userId : 1};

    mockRequest.body = requestBody;
    mockRequest.query = requestQuery;
    mockRequest.user = user;

    //response
    const responseBody = { 
      reviewId : 1,
      storeId : 1,
      userId : user.userId,
      reviewContent : requestBody.reviewContent,
      rating : requestBody.rating,
      createdAt : new Date().toString(),
      updatedAt : new Date().toString()
    }

    mockReviewService.createReview.mockReturnValue(responseBody);

    //excute
    await reviewController.createReview(mockRequest, mockResponse, mockNext);
    
    //verify
    expect(mockReviewService.createReview).toHaveBeenCalledWith(1, 1, 'reviewContent', 4);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: responseBody,
      message: "리뷰가 작성되었습니다."
    });
  });


  it('getReview', async () => {
    // Setup
    const userId = 1;
    
    const responseBody = [
      {
        reviewId: 1,
        userId: userId,
        storeId : 1,
        reviewContent : 'reviewContent',
        rating : 4,
        createdAt : new Date().toString(),
        updatedAt : new Date().toString()
      },
      {
        reviewId: 2,
        userId: userId,
        storeId : 1,
        reviewContent : 'reviewContent',
        rating : 5,
        createdAt : new Date().toString(),
        updatedAt : new Date().toString()
      }
    ];

    mockReviewService.getReview.mockReturnValue(responseBody);
    mockRequest.user = { userId };

    // Execute
    await reviewController.getReview(mockRequest, mockResponse, mockNext);

    // Verify
    expect(mockReviewService.getReview).toHaveBeenCalledWith(userId);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: responseBody });
  });


  it('updateReview', async () => {
    // Setup
    const requestBody = {
      reviewContent: 'Updated review content',
      rating: 5
    };
    const reviewId = 1;
    const userId = 1;

    mockRequest.body = requestBody;
    mockRequest.query = { reviewId };
    mockRequest.user = { userId };

    const responseBody = {
      reviewId: 1,
        userId: userId,
        storeId : 1,
        reviewContent : 'reviewContent',
        rating : 5,
        createdAt : new Date().toString(),
        updatedAt : new Date().toString()
    };

    mockReviewService.updateReview.mockReturnValue(responseBody);

    // Execute
    await reviewController.updateReview(mockRequest, mockResponse, mockNext);

    // Verify
    expect(mockReviewService.updateReview).toHaveBeenCalledWith(userId, reviewId, requestBody.reviewContent, requestBody.rating);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: responseBody,
      message: "리뷰가 수정되었습니다."
    });
  });


  it('deleteReview', async () => {
    // Setup
    const reviewId = 1;
    const userId = 1;

    mockRequest.query = { reviewId };
    mockRequest.user = { userId };

    const responseBody = {
      reviewId: 1,
      userId: userId,
      storeId : 1,
      reviewContent : 'reviewContent',
      rating : 4,
      createdAt : new Date().toString(),
      updatedAt : new Date().toString()
    };

    mockReviewService.deleteReview.mockReturnValue(responseBody);

    // Execute
    await reviewController.deleteReview(mockRequest, mockResponse, mockNext);

    // Verify
    expect(mockReviewService.deleteReview).toHaveBeenCalledWith(userId, reviewId);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: responseBody,
      message: "리뷰가 삭제되었습니다."
    });
  });

  
  it('getReviewByStoreId', async () => {
    // Setup
    const storeId = 1;
    const responseBody = [
      {
        reviewId: 1,
        storeId : 1,
        reviewContent : 'reviewContent',
        rating : 4,
        createdAt : new Date().toString(),
        updatedAt : new Date().toString()
      },
      {
        reviewId: 2,
        storeId : 1,
        reviewContent : 'reviewContent',
        rating : 5,
        createdAt : new Date().toString(),
        updatedAt : new Date().toString()
      }
    ];

    mockRequest.query = { storeId };

    mockReviewService.getReviewByStoreId.mockReturnValue(responseBody);

    // Execute
    await reviewController.getReviewByStoreId(mockRequest, mockResponse, mockNext);

    // Verify
    expect(mockReviewService.getReviewByStoreId).toHaveBeenCalledWith(storeId);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: responseBody });
  });
});