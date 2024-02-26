export default class OrdersRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    order = async (userId, storeId, menus) => {

        const [order, orderItem] = await this.prisma.$transction( async (tx) => {
            const order = await tx.orders.create({
                data: {
                    storeId: +storeId,
                    userId: +userId,
                }
            })
        })

    }
}