import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// INFO: Route for adding a product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      originalPrice,
      salePrice,
      onSale,
      category,
      subCategory,
      brand,
      sizes,
      bestSeller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    // Ensure category is stored as an array
    const categories = Array.isArray(category) ? category : JSON.parse(category);

    // Convert price values to Number and validate
    const originalPriceNum = Number(originalPrice);
    const salePriceNum = salePrice ? Number(salePrice) : null;

    if (isNaN(originalPriceNum) || (salePriceNum !== null && isNaN(salePriceNum))) {
      return res.status(400).json({ success: false, message: "Price must be a valid number" });
    }

    // Validate Sale Price Logic
    if (onSale === "true" && (!salePriceNum || salePriceNum >= originalPriceNum)) {
      return res.status(400).json({ success: false, message: "Invalid sale price. It must be less than the original price." });
    }

    const productImages = [image1, image2, image3, image4].filter(
      (image) => image !== undefined
    );

    let imageUrls = await Promise.all(
      productImages.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      originalPrice: originalPriceNum,
      salePrice: onSale === "true" ? salePriceNum : null,
      onSale: onSale === "true",
      category: categories,
      subCategory,
      brand,
      brand: brand || null, // If brand is not provided, set to null
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true" ? true : false,
      image: imageUrls,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.status(201).json({ success: true, message: "Product added" });
  } catch (error) {
    console.log("Error while adding product: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// INFO: Route for fetching all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("Error while fetching all products: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// INFO: Route for removing a product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log("Error while removing product: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// INFO: Route for fetching a single product
const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log("Error while fetching single product: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, getSingleProduct };
