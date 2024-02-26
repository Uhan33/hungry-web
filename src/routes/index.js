import express from 'express';
import UsersRouter from './users.router.js'
import OrdersRouter from './orders.router.js'
import ReviewRouter from './review.router.js';
import MainRouter from './main.router.js';

const router = express.Router();
router.use('/', UsersRouter)
router.use('/review/', ReviewRouter);
router.use('/store/', MainRouter);
router.use('/orders/', OrdersRouter);

export default router;
