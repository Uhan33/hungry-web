import express from 'express';
import { UsersController } from '../controllers/user.controller.js';
import { UsersService } from '../services/user.service.js';
import { UsersRepository } from '../repositories/user.repositiry.js';
import { PointRepository } from '../repositories/point.repository.js';

import { prisma } from '../utils/prisma/index.js';
const router = express.Router();
const usersRepository = new UsersRepository(prisma);
const usersService = new UsersService(usersRepository);
const pointRepository = new PointRepository(prisma);
const usersController = new UsersController(usersService, pointRepository, usersRepository);

router.post('/sign-up', usersController.userSignUp);
router.post('/sign-in', usersController.userSignIn);
router.post('/sendEmail', usersController.emailAuth);

export default router;
