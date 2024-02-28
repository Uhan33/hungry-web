export default class OrdersService {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository;
  }

  order = async (userId, storeId, menus) => {
    const order = await this.ordersRepository.order(userId, storeId, menus);

    return order;
  };

  orderCheck = async (userId, status, value, page, perPage) => {
    if (!status || (status !== 'order' && status !== 'delivering' && status !== 'success' && status !== 'cancel')) status = null;

    if (!value) value = 'desc';
    else value.toUpperCase() !== 'ASC' ? (value = 'desc') : (value = 'asc');

    const orders = await this.ordersRepository.orderCheck(userId, status, value, page, perPage);

    return orders;
  };

  orderCheckById = async (userId, orderId) => {
    const order = await this.ordersRepository.orderCheckById(userId, orderId);

    return order;
  }

  orderStatusChange = async (userId, orderId, status) => {
    if(status !== 'order' && status !== 'delivering' && status !== 'success' && status !== 'cancel')
        throw new Error('요청 상태가 올바르지 않습니다.');

    const order = await this.ordersRepository.orderStatusChange(userId, orderId, status);

    return order;
  }
}
