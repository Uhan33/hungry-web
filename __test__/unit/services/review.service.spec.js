import { jest } from '@jest/globals';
import { ReviewService } from '../../../src/services/review.service.js';

let mockReviewRepository = {
  createReview: jest.fn(),
  getReview: jest.fn(),
  updateReview: jest.fn(),
  deleteReview: jest.fn(),
  getReviewByStoreId: jest.fn()
};

let reviewService = new ReviewService(mockReviewRepository);

describe('ReviewService Unit Test', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('createReview', async () => {
    const userId = 1;
    const storeId = 1;
    const reviewContent = 'reviewContent';
    const rating = 5;

    const expectedReview = {
      userId: userId,
      storeId: storeId,
      reviewContent: reviewContent,
      rating: rating
    };

    mockReviewRepository.createReview.mockResolvedValue(expectedReview);

    const result = await reviewService.createReview(userId, storeId, reviewContent, rating);
    expect(result).toEqual(expectedReview);
    expect(mockReviewRepository.createReview).toHaveBeenCalledWith(userId, storeId, reviewContent, rating);
  });

  it('getReview', async () => {
    const userId = 1;

    const expectedReview = [{
      userId: userId,
      storeId: 1,
      reviewContent: 'reviewContent',
      rating: 5
    }];

    mockReviewRepository.getReview.mockResolvedValue(expectedReview);

    const result = await reviewService.getReview(userId);
    expect(result).toEqual(expectedReview);
    expect(mockReviewRepository.getReview).toHaveBeenCalledWith(userId);
  });

  it('updateReview', async () => {
    const userId = 1;
    const reviewId = 1;
    const reviewContent = 'reviewContent';
    const rating = 4;

    const expectedReview = {
      userId: userId,
      reviewId: reviewId,
      reviewContent: reviewContent,
      rating: rating
    };

    mockReviewRepository.updateReview.mockResolvedValue(expectedReview);

    const result = await reviewService.updateReview(userId, reviewId, reviewContent, rating);
    expect(result).toEqual(expectedReview);
    expect(mockReviewRepository.updateReview).toHaveBeenCalledWith(userId, reviewId, reviewContent, rating);
  });

  it('deleteReview', async () => {
    const userId = 1;
    const reviewId = 1;

    const expectedReview = {
      userId: userId,
      reviewId: reviewId,
      reviewContent: 'reviewContent',
      rating: 5
    };

    mockReviewRepository.deleteReview.mockResolvedValue(expectedReview);

    const result = await reviewService.deleteReview(userId, reviewId);
    expect(result).toEqual(expectedReview);
    expect(mockReviewRepository.deleteReview).toHaveBeenCalledWith(userId, reviewId);
  });

  it('getReviewByStoreId', async () => {
    const storeId = 1;

    const expectedReview = [{
      userId: 1,
      storeId: storeId,
      reviewContent: 'reviewContent',
      rating: 5
    }];

    mockReviewRepository.getReviewByStoreId.mockResolvedValue(expectedReview);

    const result = await reviewService.getReviewByStoreId(storeId);
    expect(result).toEqual(expectedReview);
    expect(mockReviewRepository.getReviewByStoreId).toHaveBeenCalledWith(storeId);
  });
});
