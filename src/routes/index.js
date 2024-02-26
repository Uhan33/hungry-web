import express from 'express';
import UsersRouter from './users.router.js'
import OrdersRouter from './orders.router.js'

const router = express.Router();
router.use('/', UsersRouter)
router.use('/orders/', OrdersRouter);

export default router;
