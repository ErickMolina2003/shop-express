import { Router } from 'express';
import {
  createAnOrder,
  deleteAnOrder,
  getAllOrders,
} from '../controllers/orders';
import { isAuthenticated, isAuthenticatedAsAdmin } from '../middlewares/index';

export default (router: Router) => {
  router.get('/orders', isAuthenticatedAsAdmin, getAllOrders);
  router.post('/orders', isAuthenticated, createAnOrder);
  router.delete('/orders/:id', isAuthenticatedAsAdmin, deleteAnOrder);
};
