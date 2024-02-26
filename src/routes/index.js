import express from 'express';
import OrdersRouter from './orders.router.js'
import ReviewRouter from './review.router.js';
import MainRouter from './main.router.js';

const router = express.Router();

router.use('/review/', ReviewRouter);
router.use('/store/', MainRouter);
router.use('/orders/', OrdersRouter);

export default router;
