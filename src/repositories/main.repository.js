export class MainRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  //가게 검색 
  searchStore = async (keyword) => {
    const reviewList  = await this.prisma.stores.findMany({
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
      },
    });

    const reviewListWithAvgRatings = reviewList.map(store => {
      const ratings = store.reviews.map(review => review.rating);
      const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
      const averageRating = ratings.length > 0 ? Math.round((totalRating / ratings.length) * 10) / 10 : 0;
      
      return {
        storeId : store.storeId,
        storeName : store.storeName,
        category : store.category,
        averageRating: averageRating
      };
    });

    return reviewListWithAvgRatings;
  };


  //랭킹 조회
  getRanking = async () => {
    const review = await this.prisma.stores.findMany({
      select : {
        storeId : true,
        storeName : true,
        category : true,
        users : {
          select : {
            point : {
              select : {
                salesAmount : true
              },
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
    return review;
  };
}