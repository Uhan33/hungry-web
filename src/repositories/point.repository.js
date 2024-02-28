export class PointRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  signUpPoint = async (userId) => {
    return await this.prisma.point.create({
      data: {
        userId: +userId,
        money: 1000000,
      },
    });
  };

  findUserById = async (userId) => {
    const user = await this.prisma.point.findFirst({
      where: { userId },
    });
    return user;
  };
}
