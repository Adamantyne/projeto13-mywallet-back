import postSignOn from '../controllers/signOnController.js';
import { signOnValidation } from '../assets/middlewares.js';
import { Router } from 'express';

const signOnRouter = Router();
signOnRouter.post("/signOn", signOnValidation,postSignOn);
export default signOnRouter;