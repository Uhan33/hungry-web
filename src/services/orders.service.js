export default class OrdersService {
    constructor(ordersRepository) {
        this.ordersRepository = ordersRepository;
    }

    order = async (storeId, menus) => {
        order = await this.ordersRepository(storeId, menus);

        return order;
    }
}