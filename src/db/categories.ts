import mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const CategoryModel = mongoose.model('Category', CategorySchema);

export const getCategories = () => CategoryModel.find();
export const getCategoryById = (id: string) => CategoryModel.findById(id);
export const createCategory = (values: Record<string, any>) =>
  new CategoryModel(values).save().then((category) => category.toObject());
export const updateCategoryById = (id: string, values: Record<string, any>) =>
  CategoryModel.findByIdAndUpdate(id, values);
export const deleteCategoryById = (id: string) =>
  CategoryModel.findByIdAndDelete(id);
