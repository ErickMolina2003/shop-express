import {
  createCategory,
  deleteCategoryById,
  getCategories,
} from '../db/categories';
import { Response, Request } from 'express';

export const getAllCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const categories = await getCategories();

    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const createACategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.sendStatus(400);
    }

    const existingCategory = await getCategories().findOne({ name });

    if (existingCategory) {
      return res.sendStatus(400);
    }

    const category = await createCategory({
      name,
      description,
    });

    return res.status(201).json(category).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const deleteACategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const deletedCategory = await deleteCategoryById(id);

    return res.json(deletedCategory);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};
