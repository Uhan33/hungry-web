import express from 'express';
import UsersRouter from './users.router.js'
import OrdersRouter from './orders.router.js'
import StoresRouter from './stores.router.js';
import ReviewRouter from './review.router.js';
import MainRouter from './main.router.js';
import MenusRouter from './menus.router.js';

const router = express.Router();

router.use('/', UsersRouter)
router.use('/stores', [StoresRouter, MenusRouter]);
router.use('/review/', ReviewRouter);
router.use('/store/', MainRouter);
router.use('/orders/', OrdersRouter);
router.use('/users/', UsersRouter);

export default router;
