import {
  createProduct,
  deleteProductById,
  getProducts,
  updateProductById,
} from '../db/products';
import { Response, Request } from 'express';

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const products = await getProducts();

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const createAProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, description, price, stock, category } = req.body;

    if (!name || !description || !price || !stock || !category) {
      return res.sendStatus(400);
    }

    const existingProduct = await getProducts().findOne({ name });

    if (existingProduct) {
      return res.sendStatus(400);
    }

    const product = await createProduct({
      name,
      description,
      price,
      stock,
      category,
    });

    return res.status(201).json(product).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const updateAProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const updates = req.body;

    if (!updates) {
      return res.sendStatus(400);
    }

    const product = await updateProductById(id, updates);

    if (!product) {
      return res.sendStatus(400);
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const deleteAProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const deletedProduct = await deleteProductById(id);

    return res.json(deletedProduct);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};
