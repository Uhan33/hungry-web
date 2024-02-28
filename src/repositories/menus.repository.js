export class MenusRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createMenu = async (storeId, menuName, menuImage, price, content) => {
    const createdMenu = await this.prisma.menus.create({
      data: {
        storeId: +storeId,
        menuName,
        menuImage,
        price,
        content,
      },
    });

    return createdMenu;
  };

  getMenus = async (userId) => {
    const store = await this.prisma.stores.findFirst({
      where: {userId: userId}
    })

    if(!store)
      throw new Error('업장 정보가 업습니다.');

    const Menus = await this.prisma.menus.findMany({
      where: {storeId: store.storeId}
    });

    return Menus;
  };

  getMenu = async (storeId, menuId) => {
    const Menu = await this.prisma.menus.findFirst({
      where: { storeId: +storeId, menuId: +menuId },
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
      where: { storeId: +storeId, menuId: +menuId },
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
      where: { storeId: +storeId, menuId: +menuId },
    });

    return deletedMenu;
  };
}
