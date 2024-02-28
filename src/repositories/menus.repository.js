export class MenusRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createMenu = async (storeId, menuName, menuImage, price, content) => {
    const createdMenu = await this.prisma.menus.create({
      data: {
        storeId,
        menuName,
        menuImage,
        price,
        content,
      },
    });

    return createdMenu;
  };

  getMenus = async () => {
    const Menus = await this.prisma.menus.findMany();

    return Menus;
  };

  getMenu = async (storeId, menuId) => {
    const Menu = await this.prisma.menus.findFirst({
      where: { storeId: +storeId, munuId: +menuId },
    });

    return Menu;
  };

  getMenuName = async (storeId, menuName) => {
    const MenuName = await this.prisma.menus.findFirst({
      where: { storeId: +storeId, menuName },
    });

    return MenuName;
  };

  updateMenu = async (storeId, menuId, menuName, menuImage, price, content) => {
    const updatedMenu = await this.prisma.menus.update({
      where: { storeId: +storeId, munuId: +menuId },
      data: {
        menuName,
        menuImage,
        price,
        content,
      },
    });

    return updatedMenu;
  };

  deleteMenu = async (storeId, menuId) => {
    const deletedMenu = await this.prisma.menus.delete({
      where: { storeId: +storeId, munuId: +menuId },
    });

    return deletedMenu;
  };
}
