import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  originalPrice: { type: Number, required: true, set: (v) => Number(v) },
  salePrice: { type: Number, set: (v) => (v ? Number(v) : null) },
  onSale: { type: Boolean, default: false },
  image: { type: Array, required: true },
  processedTryonImage: { type: String, default: null }, // 👈 new optional field
  categories: [{
    category: { type: String, required: true },
    subCategories: { type: [String], default: [] }
  }],
  sizes: { type: Array, required: true },
  bestSeller: { type: Boolean },
  date: { type: Number, required: true },
  brand: { type: String, default: null },
});


const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;