import express, { Request, Response } from 'express';
import authRoutes from './auth';
import healthRoutes from './health';

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);

router.use('/', express.static(`${__dirname}/../../public/`, {
  index: 'landing.html',
  extensions: ['html']
}));

export default router;

