import express from "express";
import { UsersController } from '../controllers/user.controller.js';
import { UsersService } from '../services/user.service.js';
import { UsersRepository } from '../repositories/user.repositiry.js';
import { prisma } from '../utils/prisma/index.js';
const router = express.Router()
const usersRepository = new UsersRepository(prisma);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

router.post('/sign-up', usersController.userSignUp);
router.post('/sign-in', usersController.userSignIn);

export default router