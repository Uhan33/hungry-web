export class MenusService {
  constructor(menusRepository) {
    this.menusRepository = menusRepository;
  }

  createMenu = async (storeId, menuName, menuImage, price, content) => {
    const MenuName = await this.menusRepository.getMenuName(storeId, menuName);
    if (MenuName) throw new Error('이미 중복된 메뉴 이름이 있습니다.');

    const createdMenu = await this.menusRepository.createMenu(storeId, menuName, menuImage, price, content);

    return createdMenu;
  };

  getMenus = async () => {
    const Menus = await this.menusRepository.getMenus();

    return Menus;
  };

  updateMenu = async (storeId, menuId, menuName, menuImage, price, content) => {
    const Menu = await this.menusRepository.getMenu(storeId, menuId);
    if (!Menu) throw new Error('존재 하지 않는 메뉴 입니다.');

    const MenuName = await this.menusRepository.getMenuName(storeId, menuName);
    if (MenuName) throw new Error('이미 중복된 메뉴 이름이 있습니다.');

    const updatedMenu = await this.menusRepository.updateMenu(storeId, menuId, menuName, menuImage, price, content);

    return updatedMenu;
  };

  deleteMenu = async (storeId, menuId) => {
    const Menu = await this.menusRepository.getMenu(storeId, menuId);
    if (!Menu) throw new Error('존재 하지 않는 메뉴 입니다.');

    const deletedMenu = await this.menusRepository.deleteMenu(storeId, menuId);

    return deletedMenu;
  };
}
