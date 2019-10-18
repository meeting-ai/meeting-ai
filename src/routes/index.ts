import express, { Request, Response } from 'express';

const router = express.Router();

router.use('/ui', express.static(`${__dirname}/../public/`, {
  extensions: ['html']
}));

export default router;

