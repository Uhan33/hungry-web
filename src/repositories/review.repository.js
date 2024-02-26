export class ReviewRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createReview = async (userId, storeId, reviewContent, rating) => {

    //유효성 검증 -> select role from users where userId = {userId} <-> user

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

  updateReview = async (userId, reviewId, reviewContent, rating) => {

    //유효성 검증 -> select userId from reviews where reviewId = {reviewId} <-> req.user.userId

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

  deleteReview = async (userId, reviewId) => {

    //유효성 검증 -> select userId from reviews where reviewId = {reviewId} <-> req.user.userId

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