export class ReviewRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  //유효성 검증 -> select userId from reviews where reviewId = {reviewId} <-> req.user.userId
  checkUser = async (reviewId) => {
    const review = await this.prisma.reviews.findFirst({
      where : {
        reviewId : +reviewId
      }
    });
    return review;
  
  };

  createReview = async (userId, storeId, reviewContent, rating) => {
    const review = await this.prisma.reviews.create({
      data : {
        userId : +userId,
        storeId : +storeId,
        reviewContent : reviewContent,
        rating : +rating
      }
    });
    return review;
  };

  getReview = async (userId) => {
    const getReview = await this.prisma.reviews.findMany({
      where : {
        userId : +userId
      },
      select: {
        reviewContent : true,
        rating : true,
        storeId : true,
        stores : {
          select : {
            storeName : true
          }
        }
      },
    });
    return getReview;
  };

  updateReview = async (reviewId, reviewContent, rating) => {
    const updatedPost = await this.prisma.reviews.update({
      where: {
        reviewId: +reviewId,
      },
      data: {
        reviewContent : reviewContent,
        rating : +rating
      },
    });
    return updatedPost;
  }

  deleteReview = async (reviewId) => {
    const deletedReview = await this.prisma.reviews.delete({
      where: {
        reviewId: +reviewId,
      }
    });
    return deletedReview;
  }

  getReviewByStoreId = async (storeId) => {
    const getReview = await this.prisma.reviews.findMany({
      where: {
        storeId: +storeId,
      },
      select: {
        reviewContent : true,
        rating : true,
        storeId : true,
        stores : {
          select : {
            storeName : true
          }
        }
      },
    });
    return getReview;
  }

}