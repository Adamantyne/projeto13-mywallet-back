import signInRouter from './signInRoutes.js';
import signOnRouter from './signOnRoutes.js';
import { Router } from 'express';

const router = Router();
router.use(signInRouter);
router.use(signOnRouter)
export default router;