export default class OrdersService {
    constructor(ordersRepository) {
        this.ordersRepository = ordersRepository;
    }

    order = async (userId, storeId, menus) => {
        const order = await this.ordersRepository.order(userId, storeId, menus);

        return order;
    }
}