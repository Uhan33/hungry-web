import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import OrdersController from '../controllers/orders.controller.js';
import OrdersService from '../services/orders.service.js';
import OrdersRepository from '../repositories/orders.repository.js';

const router = express.Router();

const ordersRepository = new OrdersRepository(prisma);
const ordersService = new OrdersService(ordersRepository);
const ordersController = new OrdersController(ordersService);

router.post('/order', authMiddleware, ordersController.order);
router.get('/', authMiddleware, ordersController.orderCheck);
router.get('/:orderId', authMiddleware, ordersController.orderCheckById);
router.post('/:orderId/orderStatusChange', authMiddleware, ordersController.orderStatusChange);

export default router;
