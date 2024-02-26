import express from 'express';
<<<<<<< HEAD
import UsersRouter from './users.router.js'
import OrdersRouter from './orders.router.js'
=======
import StoresRouter from './stores.router.js';
import OrdersRouter from './orders.router.js';
>>>>>>> a96bf387d45a89f3756c11b23a1913dc31353618
import ReviewRouter from './review.router.js';
import MainRouter from './main.router.js';

const router = express.Router();
<<<<<<< HEAD
router.use('/', UsersRouter)
=======

router.use('/stores', StoresRouter);
>>>>>>> a96bf387d45a89f3756c11b23a1913dc31353618
router.use('/review/', ReviewRouter);
router.use('/store/', MainRouter);
router.use('/orders/', OrdersRouter);

export default router;
