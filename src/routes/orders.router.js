import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import OrdersController from '../controllers/orders.controller.js';
import OrdersService from '../services/orders.service.js';
import OrdersRepository from '../repositories/orders.repository.js';

const router = express.Router();

const ordersRepository = new OrdersRepository(prisma);
const ordersService = new OrdersService(ordersRepository);
const ordersController = new OrdersController(ordersService)

router.post('/order', ordersController.order);
router.get('/', ordersController.orderCheck);
router.get('/:orderId', ordersController.orderCheckById);
router.get('/orderComplete/:orderId', ordersController.orderComplete);


export default router;




