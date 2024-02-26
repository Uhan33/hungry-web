export class ReviewService {
  constructor(reviwRepository) {
    this.reviwRepository = reviwRepository;
  }

  createReview = async (userId, storeId, reviewContent, rating) => {
    return await this.reviwRepository.createReview(userId, storeId, reviewContent, rating);
  };

  getReview = async (userId) => {
    return await this.reviwRepository.getReview(userId);
  };

  updateReview = async (userId, reviewId, reviewContent, rating) => {
    const review = await this.reviwRepository.updateReview(userId, reviewId, reviewContent, rating);

    if (!review) throw new Error('삭제된 리뷰입니다.');
    return review;
  }

  deleteReview = async (userId, reviewId) => {
    const review = await this.reviwRepository.deleteReview(userId, reviewId);

    if (!review) throw new Error('삭제된 리뷰입니다.');
    return review;
  }

  getReviewByStoreId = async (storeId) => {
    return await this.reviwRepository.getReviewByStoreId(storeId);
  }

}