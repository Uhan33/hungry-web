export class MenusController {
  constructor(menusService) {
    this.menusService = menusService;
  }

  // 메뉴 생성
  createMenu = async (req, res, next) => {
    try {
      const { storeId } = req.params;
      const { menuName, menuImage, price, content } = req.body;

      if (!menuName || !menuImage || !price || !content) throw new Error('필수 입력값을 입력해주세요.');

      const createdMenu = await this.menusService.createMenu(storeId, menuName, menuImage, price, content);

      return res.status(201).json({ data: createdMenu });
    } catch (err) {
      next(err);
    }
  };

  // 메뉴 목록 조회
  getMenus = async (req, res, next) => {
    try {
      const Menus = await this.menusService.getMenus();

      return res.status(200).json({ data: Menus });
    } catch (err) {
      next(err);
    }
  };

  // 메뉴 정보 수정
  updateMenu = async (req, res, next) => {
    try {
      const { storeId, menuId } = req.params;
      const { menuName, menuImage, price, content } = req.body;

      if (!menuName || !menuImage || !price || !content) throw new Error('필수 입력값을 입력해주세요.');

      const updatedMenu = await this.menusService.updateMenu(storeId, menuId, menuName, menuImage, price, content);

      return res.status(200).json({ data: updatedMenu });
    } catch (err) {
      next(err);
    }
  };

  // 메뉴 삭제
  deleteMenu = async (req, res, next) => {
    try {
      const { storeId, menuId } = req.params;

      const deletedMenu = await this.menusService.deleteMenu(storeId, menuId);

      return res.status(200).json({ data: deletedMenu });
    } catch (err) {
      next(err);
    }
  };
}
