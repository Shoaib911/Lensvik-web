import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
    set: (v) => Number(v), 
  },
  salePrice: { 
    type: Number, 
    set: (v) => (v ? Number(v) : null),
  },
  onSale: { 
    type: Boolean, 
    default: false },
  image: {
    type: Array,
    required: true,
  },
  category: {
    type: [String], // Changed to array to allow multiple categories
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  sizes: {
    type: Array,
    required: true,
  },
  bestSeller: {
    type: Boolean,
  },
  date: {
    type: Number,
    required: true,
  },
  brand: {
    type: String, // New field for brand
    default: null,
  },
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
