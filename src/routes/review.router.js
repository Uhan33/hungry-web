import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { prisma } from '../utils/prisma/index.js';
import { ReviewService } from '../services/review.service.js';
import { ReviewRepository } from '../repositories/review.repository.js';
import { ReviewController } from '../controllers/review.controller.js';

const router = express.Router();

const reviewRepository = new ReviewRepository(prisma);
const reviewService = new ReviewService(reviewRepository);
const reviewController = new ReviewController(reviewService);

//추후 미들웨어 추가
router.post('/', authMiddleware, reviewController.createReview);
router.get('/', authMiddleware, reviewController.getReview);
router.put('/', authMiddleware, reviewController.updateReview);
router.delete('/', authMiddleware, reviewController.deleteReview);
router.get('/store', reviewController.getReviewByStoreId);

export default router;