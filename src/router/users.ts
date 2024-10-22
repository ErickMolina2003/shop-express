import { Router } from 'express';
import { deleteUser, getAllUsers, updateUser } from '../controllers/users';
import { isAuthenticated } from '../middlewares';

export default (router: Router) => {
    router.get('/users', getAllUsers);
    router.delete('/users/:id', isAuthenticated, deleteUser);
    router.patch('/users/:id', isAuthenticated, updateUser);
}