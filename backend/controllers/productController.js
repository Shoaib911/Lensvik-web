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
      categories,
      brand,
      sizes,
      bestSeller,
      processedImage, // ✅ base64 string
    } = req.body;

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    // Safely parse JSON fields
    let categoriesData = [];
    let sizesData = [];
    try {
      categoriesData = JSON.parse(categories);
    } catch (err) {
      return res.status(400).json({ success: false, message: "Invalid categories JSON" });
    }

    try {
      sizesData = JSON.parse(sizes);
    } catch (err) {
      return res.status(400).json({ success: false, message: "Invalid sizes JSON" });
    }

    if (!categoriesData.length) {
      return res.status(400).json({ success: false, message: "At least one category must be selected" });
    }

    const originalPriceNum = Number(originalPrice);
    const salePriceNum = salePrice ? Number(salePrice) : null;

    if (isNaN(originalPriceNum) || (salePriceNum !== null && isNaN(salePriceNum))) {
      return res.status(400).json({ success: false, message: "Price must be a valid number" });
    }

    if (onSale === "true" && (!salePriceNum || salePriceNum >= originalPriceNum)) {
      return res.status(400).json({ success: false, message: "Invalid sale price. It must be less than the original price." });
    }

    const productImages = [image1, image2, image3, image4].filter(Boolean);
    const imageUrls = await Promise.all(
      productImages.map(async (image) => {
        const result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    let processedImageUrl = null;
try {
  if (processedImage && processedImage.startsWith("data:image")) {
    const uploadResponse = await cloudinary.uploader.upload(processedImage, {
      resource_type: "image",
      folder: "tryon_images",
    });
    processedImageUrl = uploadResponse.secure_url;
  }
} catch (err) {
  console.error("Error uploading processedImage to Cloudinary:", err);
}


    const productData = {
      name,
      description,
      originalPrice: originalPriceNum,
      salePrice: onSale === "true" ? salePriceNum : null,
      onSale: onSale === "true",
      categories: categoriesData,
      brand: brand || null,
      sizes: sizesData,
      bestSeller: bestSeller === "true",
      image: imageUrls,
      processedTryonImage: processedImageUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.status(201).json({ success: true, message: "Product added" });
  } catch (error) {
    console.error("Error while adding product:", error);
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

const updateProduct = async (req, res) => {
  try {
    const { productId, name, originalPrice, onSale, salePrice, categories,processedTryonImage } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required." });
    }

    const updatedData = {
      name,
      originalPrice,
      onSale,
      salePrice: onSale ? salePrice : null,
      categories,
    };

    if (processedTryonImage) {
      updatedData.processedTryonImage = processedTryonImage;
    }
    
    await productModel.findByIdAndUpdate(productId, updatedData);

    res.status(200).json({ success: true, message: "Product updated successfully." });
  } catch (error) {
    console.error("Error while updating product:", error);
    res.status(500).json({ success: false, message: "Failed to update product." });
  }
};


export { addProduct, listProducts, removeProduct, getSingleProduct,updateProduct };
