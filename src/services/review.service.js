import { ReviewError } from '../exception/review.exception.error.js';

export class ReviewService {
  constructor(reviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  //유효성 검사
  async checkUser(userId, reviewId) {
    const review = await this.reviewRepository.checkUser(reviewId);

    if (!review || review.userId !== userId) {
      throw new ReviewError('권한이 없습니다.');
    }
  }

  //리뷰 생성
  async createReview(userId, storeId, reviewContent, rating) {
    return await this.reviewRepository.createReview(userId, storeId, reviewContent, rating);
  }

  //리뷰 조회 (1)
  async getReview(userId) {
    return await this.reviewRepository.getReview(userId);
  }

  //리뷰 수정
  async updateReview(userId, reviewId, reviewContent, rating) {
    await this.checkUser(userId, reviewId);
    const review = await this.reviewRepository.updateReview(reviewId, reviewContent, rating);

    if (!review) throw new ReviewError('삭제된 리뷰입니다.');
    return review;
  }

  //리뷰 삭제
  async deleteReview(userId, reviewId) {
    await this.checkUser(userId, reviewId);
    const review = await this.reviewRepository.deleteReview(reviewId);

    if (!review) throw new ReviewError('삭제된 리뷰입니다.');
    return review;
  }

  //리뷰 조회 (M)
  async getReviewByStoreId(storeId) {
    return await this.reviewRepository.getReviewByStoreId(storeId);
  }
}
