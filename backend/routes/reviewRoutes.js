import express from "express";
import upload from "../middleware/multer.js";
import { addReview, listReviews, removeReview } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post(
  "/create",
  upload.array("images", 4),  // allow max 4 images upload
  addReview
);

reviewRouter.get("/product/:productId", listReviews);

reviewRouter.post("/remove", removeReview);  // (optional, for admin)

export default reviewRouter;
