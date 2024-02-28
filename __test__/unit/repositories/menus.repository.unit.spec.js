import { jest } from '@jest/globals';
import { MenusRepository } from '../../../src/repositories/menus.repository';

let mockPrisma = {
  menus: {
    create: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

let menusRepository = new MenusRepository(mockPrisma);

describe('메뉴 Repository 유닛 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('createMenu 함수', async () => {
    const mockReturn = 'create String';
    mockPrisma.menus.create.mockReturnValue(mockReturn);

    const createMenuParams = {
      storeId: 1,
      menuName: 'createmenuName',
      menuImage: 'createmenuImage',
      price: 'createprice',
      content: 'createcontent',
    };

    const createMenuData = await menusRepository.createMenu(
      createMenuParams.storeId,
      createMenuParams.menuName,
      createMenuParams.menuImage,
      createMenuParams.price,
      createMenuParams.content
    );
    expect(createMenuData).toEqual(mockReturn);

    expect(mockPrisma.menus.create).toHaveBeenCalledTimes(1);
    expect(mockPrisma.menus.create).toHaveBeenCalledWith({
      data: {
        storeId: createMenuParams.storeId,
        menuName: createMenuParams.menuName,
        menuImage: createMenuParams.menuImage,
        price: createMenuParams.price,
        content: createMenuParams.content,
      },
    });
  });

  test('getMenus 함수', async () => {
    const mockReturn = 'findMany String';
    mockPrisma.menus.findMany.mockReturnValue(mockReturn);

    const Menus = await menusRepository.getMenus();
    expect(Menus).toEqual(mockReturn);

    expect(mockPrisma.menus.findMany).toHaveBeenCalledTimes(1);
  });

  test('getMenu 함수', async () => {
    const mockReturn = 'findFirst Stirng';
    mockPrisma.menus.findFirst.mockReturnValue(mockReturn);

    const getMenuParams = {
      storeId: 1,
      menuId: 1,
    };

    const getMenuData = await menusRepository.getMenu(getMenuParams.storeId, getMenuParams.menuId);
    expect(getMenuData).toEqual(mockReturn);

    expect(mockPrisma.menus.findFirst).toHaveBeenCalledTimes(1);
    expect(mockPrisma.menus.findFirst).toHaveBeenCalledWith({
      where: { storeId: +getMenuParams.storeId, munuId: +getMenuParams.menuId },
    });
  });

  test('getMenuName 함수', async () => {
    const mockReturn = 'findFirst Stirng';
    mockPrisma.menus.findFirst.mockReturnValue(mockReturn);

    const getMenuNameParams = {
      storeId: 1,
      menuName: 'getMenuName',
    };

    const getMenuNameData = await menusRepository.getMenuName(getMenuNameParams.storeId, getMenuNameParams.menuName);
    expect(getMenuNameData).toEqual(mockReturn);

    expect(mockPrisma.menus.findFirst).toHaveBeenCalledTimes(1);
    expect(mockPrisma.menus.findFirst).toHaveBeenCalledWith({
      where: { storeId: +getMenuNameParams.storeId, menuName: getMenuNameParams.menuName },
    });
  });

  test('updateMenu 함수', async () => {
    const mockReturn = 'update Stirng';
    mockPrisma.menus.update.mockReturnValue(mockReturn);

    const updateMenuParams = {
      storeId: 1,
      menuId: 1,
      menuName: 'updateMenuName',
      menuImage: 'updateMenuIamge',
      price: 'updateprice',
      content: 'updatecontent',
    };

    const updateMenuData = await menusRepository.updateMenu(
      updateMenuParams.storeId,
      updateMenuParams.menuId,
      updateMenuParams.menuName,
      updateMenuParams.menuImage,
      updateMenuParams.price,
      updateMenuParams.content
    );
    expect(updateMenuData).toEqual(mockReturn);

    expect(mockPrisma.menus.update).toHaveBeenCalledTimes(1);
    expect(mockPrisma.menus.update).toHaveBeenCalledWith({
      where: { storeId: +updateMenuParams.storeId, munuId: +updateMenuParams.menuId },
      data: {
        menuName: updateMenuParams.menuName,
        menuImage: updateMenuParams.menuImage,
        price: updateMenuParams.price,
        content: updateMenuParams.content,
      },
    });
  });

  test('deleteMenu 함수', async () => {
    const mockReturn = 'delete String';
    mockPrisma.menus.delete.mockReturnValue(mockReturn);

    const deleteMenuParams = {
      storeId: 1,
      menuId: 1,
    };

    const deleteMenuData = await menusRepository.deleteMenu(deleteMenuParams.storeId, deleteMenuParams.menuId);
    expect(deleteMenuData).toEqual(mockReturn);

    expect(mockPrisma.menus.delete).toHaveBeenCalledTimes(1);
    expect(mockPrisma.menus.delete).toHaveBeenCalledWith({
      where: { storeId: +deleteMenuParams.storeId, munuId: +deleteMenuParams.menuId },
    });
  });
});
