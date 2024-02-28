import { expect, jest } from '@jest/globals';
import { MenusService } from '../../../src/services/menus.service';

let mockMenusRepository = {
  getMenuName: jest.fn(),
  createMenu: jest.fn(),
  getMenus: jest.fn(),
  getMenu: jest.fn(),
  updateMenu: jest.fn(),
  deleteMenu: jest.fn(),
};

let menusService = new MenusService(mockMenusRepository);

describe('메뉴 Service 유닛 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('createMenu 함수', async () => {
    const createsample = {
      menuId: 1,
      storeId: 1,
      menuName: 'createmenuName',
      menuImage: 'createmenuImage',
      price: 1000,
      content: 'createcontent',
      createdAt: '2024-02-20T13:56:48.431Z',
      updatedAt: '2024-02-20T13:56:48.431Z',
    };
    mockMenusRepository.createMenu.mockReturnValue(createsample);
    mockMenusRepository.getMenuName.mockReturnValue(null);

    const createdMenu = await menusService.createMenu(1, 'createmenuName', 'createmenuImage', 1000, 'createcontent');
    expect(createdMenu).toEqual(createsample);

    expect(mockMenusRepository.getMenuName).toHaveBeenCalledTimes(1);
    expect(mockMenusRepository.getMenuName).toHaveBeenCalledWith(createsample.storeId, createsample.menuName);

    expect(mockMenusRepository.createMenu).toHaveBeenCalledTimes(1);
    expect(mockMenusRepository.createMenu).toHaveBeenCalledWith(
      createsample.storeId,
      createsample.menuName,
      createsample.menuImage,
      createsample.price,
      createsample.content
    );
  });

  test('getMenus 함수', async () => {
    const samples = [
      {
        menuId: 1,
        storeId: 1,
        menuName: 'createmenuName',
        menuImage: 'createmenuImage',
        price: 1000,
        content: 'createcontent',
        createdAt: '2024-02-20T13:56:48.431Z',
        updatedAt: '2024-02-20T13:56:48.431Z',
      },
      {
        menuId: 2,
        storeId: 2,
        menuName: 'createmenuName',
        menuImage: 'createmenuImage',
        price: 1000,
        content: 'createcontent',
        createdAt: '2024-02-20T13:56:48.431Z',
        updatedAt: '2024-02-20T13:56:48.431Z',
      },
    ];
    mockMenusRepository.getMenus.mockReturnValue(samples);

    const Menus = await menusService.getMenus();
    expect(Menus).toEqual(samples);

    expect(mockMenusRepository.getMenus).toHaveBeenCalledTimes(1);
  });

  test('updateMenu 함수', async () => {
    const updatesample = {
      menuId: 1,
      storeId: 1,
      menuName: 'updatemenuName',
      menuImage: 'updatemenuImage',
      price: 1000,
      content: 'updatecontent',
      createdAt: '2024-02-20T13:56:48.431Z',
      updatedAt: '2024-02-21T13:56:48.431Z',
    };
    mockMenusRepository.updateMenu.mockReturnValue(updatesample);
    mockMenusRepository.getMenu.mockReturnValue(updatesample);
    mockMenusRepository.getMenuName.mockReturnValue(null);

    const updatedMenu = await menusService.updateMenu(1, 1, 'updatemenuName', 'updatemenuImage', 1000, 'updatecontent');
    expect(updatedMenu).toEqual(updatesample);

    expect(mockMenusRepository.getMenu).toHaveBeenCalledTimes(1);
    expect(mockMenusRepository.getMenu).toHaveBeenCalledWith(updatesample.storeId, updatesample.menuId);

    expect(mockMenusRepository.getMenuName).toHaveBeenCalledTimes(1);
    expect(mockMenusRepository.getMenuName).toHaveBeenCalledWith(updatesample.storeId, updatesample.menuName);

    expect(mockMenusRepository.updateMenu).toHaveBeenCalledTimes(1);
    expect(mockMenusRepository.updateMenu).toHaveBeenCalledWith(
      updatesample.storeId,
      updatesample.menuId,
      updatesample.menuName,
      updatesample.menuImage,
      updatesample.price,
      updatesample.content
    );
  });

  test('deleteMenu 함수', async () => {
    const deletesample = {
      menuId: 1,
      storeId: 1,
      menuName: 'deletemenuName',
      menuImage: 'deletemenuImage',
      price: 1000,
      content: 'deletecontent',
      createdAt: '2024-02-20T13:56:48.431Z',
      updatedAt: '2024-02-20T13:56:48.431Z',
    };
    mockMenusRepository.deleteMenu.mockReturnValue(deletesample);
    mockMenusRepository.getMenu.mockReturnValue(deletesample);

    const deletedMenu = await menusService.deleteMenu(1, 1);
    expect(deletedMenu).toEqual(deletesample);

    expect(mockMenusRepository.getMenu).toHaveBeenCalledTimes(1);
    expect(mockMenusRepository.getMenu).toHaveBeenCalledWith(deletesample.storeId, deletesample.menuId);

    expect(mockMenusRepository.deleteMenu).toHaveBeenCalledTimes(1);
    expect(mockMenusRepository.deleteMenu).toHaveBeenCalledWith(deletesample.storeId, deletesample.menuId);
  });

  test('createMenu 함수 already exist menuName', async () => {
    const sample = {
      menuId: 1,
      storeId: 1,
      menuName: 'createmenuName',
      menuImage: 'createmenuImage',
      price: 1000,
      content: 'createcontent',
      createdAt: '2024-02-20T13:56:48.431Z',
      updatedAt: '2024-02-20T13:56:48.431Z',
    };
    mockMenusRepository.getMenuName.mockReturnValue(sample);

    try {
      await menusService.createMenu(1, 'createmenuName', 'createmenuImage', 1000, 'createcontent');
    } catch (err) {
      expect(mockMenusRepository.getMenuName).toHaveBeenCalledTimes(1);
      expect(mockMenusRepository.getMenuName).toHaveBeenCalledWith(sample.storeId, sample.menuName);

      expect(mockMenusRepository.createMenu).toHaveBeenCalledTimes(0);
      expect(err.message).toEqual('이미 중복된 메뉴 이름이 있습니다.');
    }
  });

  test('updateMenu 함수 Not found Error', async () => {
    const sample = null;
    mockMenusRepository.getMenu.mockReturnValue(sample);

    try {
      await menusService.updateMenu(1, 1, 'updatemenuName', 'updatemenuImage', 1000, 'updatecontent');
    } catch (err) {
      expect(mockMenusRepository.getMenu).toHaveBeenCalledTimes(1);
      expect(mockMenusRepository.getMenu).toHaveBeenCalledWith(1, 1);

      expect(mockMenusRepository.getMenuName).toHaveBeenCalledTimes(0);
      expect(mockMenusRepository.updateMenu).toHaveBeenCalledTimes(0);
      expect(err.message).toEqual('존재 하지 않는 메뉴 입니다.');
    }
  });

  test('updateMenu 함수 already exist menuName', async () => {
    const sample = {
      menuId: 1,
      storeId: 1,
      menuName: 'updatemenuName',
      menuImage: 'updatemenuImage',
      price: 1000,
      content: 'updatecontent',
      createdAt: '2024-02-20T13:56:48.431Z',
      updatedAt: '2024-02-20T13:56:48.431Z',
    };
    mockMenusRepository.getMenu.mockReturnValue(sample);
    mockMenusRepository.getMenuName.mockReturnValue(sample);

    try {
      await menusService.updateMenu(1, 1, 'updatemenuName', 'updatemenuImage', 1000, 'updatecontent');
      expect(mockMenusRepository.getMenu).toHaveBeenCalledTimes(1);
      expect(mockMenusRepository.getMenu).toHaveBeenCalledWith(sample.menuId, sample.storeId);
    } catch (err) {
      expect(mockMenusRepository.getMenuName).toHaveBeenCalledTimes(1);
      expect(mockMenusRepository.getMenuName).toHaveBeenCalledWith(sample.storeId, sample.menuName);

      expect(mockMenusRepository.updateMenu).toHaveBeenCalledTimes(0);
      expect(err.message).toEqual('이미 중복된 메뉴 이름이 있습니다.');
    }
  });

  test('deleteMenu 함수 Not found Error', async () => {
    const sample = null;
    mockMenusRepository.getMenu.mockReturnValue(sample);

    try {
      await menusService.deleteMenu(1, 1);
    } catch (err) {
      expect(mockMenusRepository.getMenu).toHaveBeenCalledTimes(1);
      expect(mockMenusRepository.getMenu).toHaveBeenCalledWith(1, 1);

      expect(mockMenusRepository.deleteMenu).toHaveBeenCalledTimes(0);
      expect(err.message).toEqual('존재 하지 않는 메뉴 입니다.');
    }
  });
});
