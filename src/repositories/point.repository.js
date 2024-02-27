export class PointRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  signUpPoint = async (userId) => {
    await this.prisma.point.create({
      data: {
        userId: +userId,
        money: 1000000,
      },
    });
  };
}
