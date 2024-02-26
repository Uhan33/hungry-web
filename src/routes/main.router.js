import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { prisma } from '../utils/prisma/index.js';
import { MainService } from '../services/main.service.js';
import { MainRepository } from '../repositories/main.repository.js';
import { MainController } from '../controllers/main.controller.js';

const router = express.Router();

const mainRepository = new MainRepository(prisma);
const mainService = new MainService(mainRepository);
const mainController = new MainController(mainService);

//추후 미들웨어 추가
router.get('/', mainController.searchStore);
router.get('/ranking', mainController.getRanking);

export default router;