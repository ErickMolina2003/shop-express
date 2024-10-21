import { Router } from 'express';
import {
  getAllCategories,
  createACategory,
  deleteACategory,
} from '../controllers/categories';
import { isAuthenticated, isAuthenticatedAsAdmin } from '../middlewares/index';

export default (router: Router) => {
  router.get('/categories', isAuthenticated, getAllCategories);
  router.post('/categories', isAuthenticatedAsAdmin, createACategory);
  router.delete('/categories/:id', isAuthenticatedAsAdmin, deleteACategory);
};
