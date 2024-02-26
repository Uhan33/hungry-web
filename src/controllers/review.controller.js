export class ReviewController {
  constructor(reviewService) {
    this.reviewService = reviewService;
  }

  //리뷰 작성 (로그인 작업 완료 시 req.param.userId -> req.user.userId 로 변경하기)
  createReview = async (req, res, next) => {
    const { reviewContent, rating } = req.body;

    try {
      return res.status(201).json(
        { data : await this.reviewService.createReview(
          req.user.userId, 
          req.query.storeId, 
          reviewContent, 
          rating
          ),
          message : "리뷰가 작성되었습니다."
        }
      );   
    } catch(error) {
      next(error);
    }
  }

  //내 리뷰 조회
  getReview = async (req, res, next) => {
    try {
      return res.status(201).json(
        { data : await this.reviewService.getReview(req.user.userId)}
      ); 
    } catch(error) {
      next(error);
    }
  }

  updateReview = async (req, res, next) => {
    const { reviewContent, rating } = req.body;
    
    try {
      return res.status(201).json(
        { 
          data : await this.reviewService.updateReview(
          req.user.userId, 
          req.query.reviewId, 
          reviewContent, 
          rating
          ),
          message : "리뷰가 수정되었습니다."
        }
      );   
    } catch(error) {
      next(error);
    }
  }

  deleteReview = async (req, res, next) => {
    try {
      return res.status(201).json(
        { 
          data : await this.reviewService.deleteReview(req.user.userId, req.query.reviewId),
          message : "리뷰가 삭제되었습니다."
        }
      );  
    } catch(error) {
      next(error);
    }
  }

  //가게 리뷰 조회
  getReviewByStoreId = async (req, res, next) => {
    try {
      return res.status(201).json(
        { data : await this.reviewService.getReviewByStoreId(req.query.storeId)}
      ); 
    } catch(error) {
      next(error);
    }
  }
}