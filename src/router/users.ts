import { Router } from 'express';
import { deleteUser, getAllUsers, updateUser } from '../controllers/users';
import { isAuthenticated } from '../middlewares';

export default (router: Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:id', deleteUser);
    router.patch('/users/:id', isAuthenticated, updateUser);
}