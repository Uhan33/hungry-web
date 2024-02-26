import { jest } from '@jest/globals';
import { ReviewRepository } from '../../../src/repositories/review.repository.js';

let mockPrisma = {
  reviews: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }
};

let reviewRepository = new ReviewRepository(mockPrisma);

describe('ReviewRepository Unit Test', () => {

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

    mockPrisma.reviews.create.mockResolvedValue(expectedReview);

    const result = await reviewRepository.createReview(userId, storeId, reviewContent, rating);
    expect(result).toEqual(expectedReview);
    expect(mockPrisma.reviews.create).toHaveBeenCalledWith({
      data: {
        userId: userId,
        storeId: storeId,
        reviewContent: reviewContent,
        rating: rating
      }
    });
  });

  it('getReview', async () => {
    const userId = 1;

    const expectedReview = [{
      userId: userId,
      storeId: 1,
      reviewContent: 'reviewContent',
      rating: 5
    }];

    mockPrisma.reviews.findMany.mockResolvedValue(expectedReview);

    const result = await reviewRepository.getReview(userId);
    expect(result).toEqual(expectedReview);
    expect(mockPrisma.reviews.findMany).toHaveBeenCalledWith({
      where: {
        userId: userId
      },
      select: {
        reviewContent: true,
        rating: true,
        storeId: true,
        stores: {
          select: {
            storeName: true
          }
        }
      },
    });
  });

  it('updateReview', async () => {
    const reviewId = 1;
    const reviewContent = 'reviewContent';
    const rating = 4;
    const userId = 1;

    const expectedReview = {
      reviewId: reviewId,
      reviewContent: reviewContent,
      rating: rating
    };

    mockPrisma.reviews.update.mockResolvedValue(expectedReview);

    const result = await reviewRepository.updateReview(userId, reviewId, reviewContent, rating);
    expect(result).toEqual(expectedReview);
    expect(mockPrisma.reviews.update).toHaveBeenCalledWith({
      where: {
        reviewId: reviewId
      },
      data: {
        reviewContent: reviewContent,
        rating: rating
      }
    });
  });

  it('deleteReview', async () => {
    const reviewId = 1;
    const userId = 1;

    const expectedReview = {
      reviewId: reviewId,
      reviewContent: 'reviewContent',
      rating: 5
    };

    mockPrisma.reviews.delete.mockResolvedValue(expectedReview);

    const result = await reviewRepository.deleteReview(userId, reviewId);
    expect(result).toEqual(expectedReview);
    expect(mockPrisma.reviews.delete).toHaveBeenCalledWith({
      where: {
        reviewId: reviewId
      }
    });
  });

  it('getReviewByStoreId', async () => {
    const storeId = 1;

    const expectedReview = [{
      userId: 1,
      storeId: storeId,
      reviewContent: 'reviewContent',
      rating: 5
    }];

    mockPrisma.reviews.findMany.mockResolvedValue(expectedReview);

    const result = await reviewRepository.getReviewByStoreId(storeId);
    expect(result).toEqual(expectedReview);
    expect(mockPrisma.reviews.findMany).toHaveBeenCalledWith({
      where: {
        storeId: storeId
      },
      select: {
        reviewContent: true,
        rating: true,
        storeId: true,
        stores: {
          select: {
            storeName: true
          }
        }
      },
    });
  });
});
