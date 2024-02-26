export default class OrdersController {
  constructor(ordersService) {
    this.ordersService = ordersService;
  }

  order = async (req, res, next) => {
    try {
      // 로그인 기능 merge하면 수정 예정정
      const { userId, storeId, menus } = req.body;

      if(!storeId || !menus)
        return res.status(400).json({message: '주문 정보가 올바르지 않습니다,'});

      const order = await this.ordersService.order(userId, storeId, menus);
      return res.status(201).json({ data: order });
    } catch (err) {
      next(err);
    }
  };

  orderCheck = async (req, res, next) => {
    try {
        return res.status(200).json({message: '성공!'});
    } catch (err) {
      next(err);
    }
  };

  orderCheckById = async (req, res, next) => {
    try {
    } catch (err) {
      next(err);
    }
  };

  orderComplete = async (req, res, next) => {
    try {
    } catch (err) {
      next(err);
    }
  };
}
