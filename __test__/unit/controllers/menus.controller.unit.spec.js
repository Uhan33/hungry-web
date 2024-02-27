import { expect, jest } from '@jest/globals';
import { MenusController } from '../../../src/controllers/menus.controller.js';

const mockMenusService = {
  createMenu: jest.fn(),
  getMenus: jest.fn(),
  updateMenu: jest.fn(),
  deleteMenu: jest.fn(),
};

const mockRequest = {
  body: jest.fn(),
  params: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

const mockNext = jest.fn();

const menusController = new MenusController(mockMenusService);

describe('메뉴 Controller 유닛 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockResponse.status.mockReturnValue(mockResponse);
  });

  test('createMenu 함수', async () => {
    const createMenuParams = {
      storeId: 1,
    };
    mockRequest.params = createMenuParams;

    const createMenuBody = {
      menuName: 'createmenuName',
      menuImage: 'createmenuImage',
      price: 1000,
      content: 'createcontent',
    };
    mockRequest.body = createMenuBody;

    const createMenuReturnValue = {
      menuId: 1,
      ...createMenuParams,
      ...createMenuBody,
      createdAt: new Date().toString,
      updatedAt: new Date().toString,
    };
    mockMenusService.createMenu.mockReturnValue(createMenuReturnValue);

    await menusController.createMenu(mockRequest, mockResponse, mockNext);

    expect(mockMenusService.createMenu).toHaveBeenCalledTimes(1);
    expect(mockMenusService.createMenu).toHaveBeenCalledWith(
      createMenuParams.storeId,
      createMenuBody.menuName,
      createMenuBody.menuImage,
      createMenuBody.price,
      createMenuBody.content
    );

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: createMenuReturnValue,
    });
  });

  test('getMenus 함수', async () => {
    const getMenuReturnValue = [
      {
        menuId: 1,
        storeId: 1,
        menuName: 'createmenuName',
        menuImage: 'createmenuImage',
        price: 1000,
        content: 'createcontent',
        createdAt: new Date().toString,
        updatedAt: new Date().toString,
      },
      {
        menuId: 2,
        storeId: 2,
        menuName: 'createmenuName',
        menuImage: 'createmenuImage',
        price: 1000,
        content: 'createcontent',
        createdAt: new Date().toString,
        updatedAt: new Date().toString,
      },
    ];
    mockMenusService.getMenus.mockReturnValue(getMenuReturnValue);

    await menusController.getMenus(mockRequest, mockResponse, mockNext);

    expect(mockMenusService.getMenus).toHaveBeenCalledTimes(1);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: getMenuReturnValue,
    });
  });

  test('updateMenu 함수', async () => {
    const updateMenuParams = {
      storeId: 1,
      menuId: 1,
    };
    mockRequest.params = updateMenuParams;

    const updateMenuBody = {
      menuName: 'updatemenuName',
      menuImage: 'updatemunuImage',
      price: 1000,
      content: 'updatecontent',
    };
    mockRequest.body = updateMenuBody;

    const updateMenuReturnValue = {
      ...updateMenuParams,
      ...updateMenuBody,
      createdAt: new Date().toString,
      updatedAt: new Date().toString,
    };
    mockMenusService.updateMenu.mockReturnValue(updateMenuReturnValue);

    await menusController.updateMenu(mockRequest, mockResponse, mockNext);

    expect(mockMenusService.updateMenu).toHaveBeenCalledTimes(1);
    expect(mockMenusService.updateMenu).toHaveBeenCalledWith(
      updateMenuParams.storeId,
      updateMenuParams.menuId,
      updateMenuBody.menuName,
      updateMenuBody.menuImage,
      updateMenuBody.price,
      updateMenuBody.content
    );

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: updateMenuReturnValue,
    });
  });

  test('deleteMenu 함수', async () => {
    const deleteMenuParams = {
      storeId: 1,
      menuId: 1,
    };
    mockRequest.params = deleteMenuParams;

    const deleteMenuReturnValue = {
      ...deleteMenuParams,
      menuName: 'deletemenuName',
      menuImage: 'deletemenuImage',
      price: 1000,
      content: 'deletecontent',
      createdAt: new Date().toString,
      updatedAt: new Date().toString,
    };
    mockMenusService.deleteMenu.mockReturnValue(deleteMenuReturnValue);

    await menusController.deleteMenu(mockRequest, mockResponse, mockNext);

    expect(mockMenusService.deleteMenu).toHaveBeenCalledTimes(1);
    expect(mockMenusService.deleteMenu).toHaveBeenCalledWith(deleteMenuParams.storeId, deleteMenuParams.menuId);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: deleteMenuReturnValue,
    });
  });

  test('createMenu 함수 실패', async () => {
    mockRequest.params = {
      storeId: 1,
    };

    mockRequest.body = {
      menuName: 'createmenuName',
      menuImage: 'createmenuImage',
    };

    await menusController.createMenu(mockRequest, mockResponse, mockNext);

    expect(mockNext).toBeCalledWith(new Error('필수 입력값을 입력해주세요.'));
  });

  test('updateMenu 함수 실패', async () => {
    mockRequest.params = {
      storeId: 1,
      menuId: 1,
    };

    mockRequest.body = {
      menuName: 'updatemenuName',
      menuImage: 'updatemunuImage',
    };

    await menusController.updateMenu(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(new Error('필수 입력값을 입력해주세요.'));
  });
});
