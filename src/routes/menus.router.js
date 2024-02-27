import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { MenusController } from '../controllers/menus.controller.js';
import { MenusService } from '../services/menus.service.js';
import { MenusRepository } from '../repositories/menus.repository.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

const menusRepository = new MenusRepository(prisma);
const menusService = new MenusService(menusRepository);
const menusController = new MenusController(menusService);

// 메뉴 등록 API
router.post('/:storeId/menus', AuthMiddleware, menusController.createMenu);

// 메뉴 목록 조회 API
router.get('/:storeId/menus', AuthMiddleware, menusController.getMenus);

// 메뉴 정보 수정 API
router.put('/:storeId/menus/:menuId', AuthMiddleware, menusController.updateMenu);

// 메뉴 삭제 API
router.delete('/:storeId/menus/:menuId', AuthMiddleware, menusController.deleteMenu);

export default router;
