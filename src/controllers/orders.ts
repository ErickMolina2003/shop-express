import { createOrder, deleteOrderById, getOrders } from '../db/orders';
import { Response, Request } from 'express';

export const getAllOrders = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const orders = await getOrders();

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const createAnOrder = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { totalPrice, user, products } = req.body;

    if (!totalPrice || !user || !products) {
      return res.sendStatus(400);
    }

    const order = await createOrder({
      totalPrice,
      user,
      products,
    });

    return res.status(201).json(order).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const deleteAnOrder = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const deletedOrder = await deleteOrderById(id);

    return res.json(deletedOrder);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};
