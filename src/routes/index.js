import express from 'express';
import StoresRouter from './stores.router.js';
import OrdersRouter from './orders.router.js';
import ReviewRouter from './review.router.js';
import MainRouter from './main.router.js';

const router = express.Router();

router.use('/stores', StoresRouter);
router.use('/review/', ReviewRouter);
router.use('/store/', MainRouter);
router.use('/orders/', OrdersRouter);

export default router;
