export default class OrdersController {
  constructor(ordersService) {
    this.ordersService = ordersService;
  }

  order = async (req, res, next) => {
    try {
      const { storeId, menus } = req.body;
      const { userId } = req.user;

      if (!storeId || !menus) return res.status(400).json({ message: '주문 정보가 올바르지 않습니다.' });

      const order = await this.ordersService.order(userId, storeId, menus);
      return res.status(201).json({ data: order });
    } catch (err) {
      next(err);
    }
  };

  orderCheck = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { status, value } = req.query;
      const { page = 1, perPage = 10 } = req.query;

      const orders = await this.ordersService.orderCheck(userId, status, value, page, perPage);
      return res.status(200).json({ data: orders });
    } catch (err) {
      next(err);
    }
  };

  orderCheckById = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { orderId } = req.params;

      const order = await this.ordersService.orderCheckById(userId, orderId);

      return res.status(200).json({ data: order });
    } catch (err) {
      next(err);
    }
  };

  orderStatusChange = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { orderId } = req.params;
      const { status } = req.query;

      const order = await this.ordersService.orderStatusChange(userId, orderId, status);

      return res.status(200).json({ data: order });
    } catch (err) {
      next(err);
    }
  };
}
