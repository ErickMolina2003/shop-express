import mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  totalPrice: { type: Number, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  ],
  status: {
    type: String,
    required: true,
    enum: ['Pendiente', 'Pagado', 'Cancelado'],
    default: 'Pendiente',
  },
  createdAt: { type: Date, default: Date.now },
});

export const OrderModel = mongoose.model('Order', OrderSchema);

export const getOrders = () =>
  OrderModel.find().populate('user').populate('products');
export const getOrderById = (id: string) => OrderModel.findById(id);
export const createOrder = (values: Record<string, any>) =>
  new OrderModel(values).save().then((order) => order.toObject());
export const updateOrderById = (id: string, values: Record<string, any>) =>
  OrderModel.findByIdAndUpdate(id, values, { new: true });
export const deleteOrderById = (id: string) => OrderModel.findByIdAndDelete(id);
