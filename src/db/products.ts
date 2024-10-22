import mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, maxLength: 130 },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export const ProductModel = mongoose.model('Product', ProductSchema);

export const getProducts = (limit: number, skip: number) =>
  ProductModel.find().populate('category').limit(limit).skip(skip);
export const getProductById = (id: string) => ProductModel.findById(id);
export const createProduct = (values: Record<string, any>) =>
  new ProductModel(values).save().then((product) => product.toObject());
export const updateProductById = (id: string, values: Record<string, any>) =>
  ProductModel.findByIdAndUpdate(id, values, { new: true });
export const deleteProductById = (id: string) =>
  ProductModel.findByIdAndDelete(id);
