import dotenv from 'dotenv';
import express from 'express';
import { configure } from './auth';

dotenv.config();

const app = express();
configure(app);
app.listen(3000);