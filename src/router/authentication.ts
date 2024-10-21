import { Router } from 'express';
import { Login, Register } from '../controllers/authentication';

export default (router: Router) => {
    router.post('/auth/register', Register);
    router.post('/auth/login', Login)
};