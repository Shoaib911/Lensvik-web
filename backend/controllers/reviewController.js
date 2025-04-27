import { v2 as cloudinary } from "cloudinary";
import Review from "../models/Review.js";

// INFO: Add a new review
const addReview = async (req, res) => {
  try {
    const { productId, name, rating, comment } = req.body;

    if (!productId || !name || !rating || !comment) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const imageFiles = req.files || [];
    const imageUrls = [];

    // Upload images to Cloudinary if available
    if (imageFiles.length > 0) {
      for (const file of imageFiles) {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
          folder: "reviews",
        });
        imageUrls.push(result.secure_url);
      }
    }

    const newReview = new Review({
      productId,
      name,
      rating,
      comment,
      images: imageUrls,
    });

    await newReview.save();

    res.status(201).json({ success: true, message: "Review added successfully", review: newReview });
  } catch (error) {
    console.error("Error while adding review:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// INFO: Get all reviews for a product
const listReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required." });
    }

    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.error("Error while fetching reviews:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// (optional) INFO: Admin remove review
const removeReview = async (req, res) => {
  try {
    const { reviewId } = req.body;

    if (!reviewId) {
      return res.status(400).json({ success: false, message: "Review ID is required." });
    }

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({ success: true, message: "Review deleted successfully." });
  } catch (error) {
    console.error("Error while deleting review:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addReview, listReviews, removeReview };
