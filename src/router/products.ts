import {
  createAProduct,
  deleteAProduct,
  getAllProducts,
  updateAProduct,
} from '../controllers/products';
import { Router } from 'express';
import { isAuthenticated, isAuthenticatedAsAdmin } from '../middlewares/index';

export default (router: Router) => {
  router.get('/products', isAuthenticated, getAllProducts);
  router.post('/products', isAuthenticatedAsAdmin, createAProduct);
  router.patch('/products/:id', isAuthenticatedAsAdmin, updateAProduct);
  router.delete('/products/:id', isAuthenticatedAsAdmin, deleteAProduct);
};
