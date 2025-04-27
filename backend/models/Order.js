import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // your user model name
    required: true
  },
  items: {
    type: Object, // { productId: { size: quantity } }
    required: true
  },
  shippingAddress: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    mobile: { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    enum: ['stripe', 'razorpay', 'cod'],
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Processing'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Order', orderSchema);
