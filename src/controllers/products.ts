import {
  createProduct,
  deleteProductById,
  getProducts,
  ProductModel,
  updateProductById,
} from '../db/products';
import { Response, Request } from 'express';

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const skip = (page - 1) * limit;

    const products = await getProducts(limit, skip);

    const totalProducts = await ProductModel.countDocuments();

    const totalPages = Math.ceil(totalProducts / limit);

    return res.status(200).json({
      data: products,
      page,
      totalPages,
      totalProducts,
    });
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

    const existingProduct = await getProducts(1, 1).findOne({ name });

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
