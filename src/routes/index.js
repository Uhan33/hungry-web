import express from 'express';
import StoresRouter from './stores.router.js';

const router = express.Router();

router.use('/stores', StoresRouter);

export default router;
