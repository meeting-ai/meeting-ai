import express, { Request, Response } from 'express';
import authRoutes from './auth';
import healthRoutes from './health';

const router = express.Router();

router.use('/ui', express.static(`${__dirname}/../../public/`, {
  extensions: ['html']
}));

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);

export default router;

