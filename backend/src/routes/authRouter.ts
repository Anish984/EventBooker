import {Router, Request, Response} from 'express';

const router = Router();

import signUp from '../controllers/authControllers/signUp';
import { login } from '../controllers/authControllers/login';

router.post('/signup',signUp);

router.post("/login",login);

export default router