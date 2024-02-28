import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { StoresController } from '../controllers/stores.controller.js';
import { StoresService } from '../services/stores.service.js';
import { StoresRepository } from '../repositories/stores.repository.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

const storesRepository = new StoresRepository(prisma);
const storesService = new StoresService(storesRepository);
const storesController = new StoresController(storesService);

// 업장 등록 API
router.post('/', AuthMiddleware, storesController.createStore);

// 업장 목록 조회 API
router.get('/', storesController.getStores);

// 업장 정보 수정 API
router.put('/:storeId', AuthMiddleware, storesController.updateStore);

// 업장 삭제 API
router.delete('/:storeId', AuthMiddleware, storesController.deleteStore);

export default router;
