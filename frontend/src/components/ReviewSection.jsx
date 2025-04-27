import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../backendUrl";
import { assets } from "../assets/assets"; // Assuming star_icon etc.

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const fetchAllReviews = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/reviews/all`);
      if (response.data.success) {
        const allReviews = response.data.reviews || [];
  
        // Step 1: Sort reviews -> 5⭐ first, then 4⭐, then 3⭐, etc.
        const sortedReviews = [...allReviews].sort((a, b) => b.rating - a.rating);
  
        // Step 2: Pick ONLY the top 5 reviews
        const selectedReviews = sortedReviews.slice(0, 5);
  
        setReviews(selectedReviews);
      } else {
        console.error(response.data.message || "Failed to load reviews.");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  

  useEffect(() => {
    fetchAllReviews();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-12 text-center">Customer Feedback</h2>

      {reviews.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
    {reviews.map((review, index) => (
      <div key={index} className="border rounded-lg p-6 shadow hover:shadow-md transition">
        <div className="flex flex-col mb-4">
          <p className="font-semibold text-lg">{review.name}</p>
          <div className="flex mt-1">
            {Array(review.rating).fill().map((_, i) => (
              <img
                key={i}
                src={assets.star_icon}
                alt="Star"
                className="w-4 h-4"
              />
            ))}
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-4">{review.comment}</p>

        {review.images?.length > 0 && (
          <div className="flex gap-3 mt-4">
            {review.images.slice(0, 2).map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt="Review Image"
                className="w-16 h-16 rounded-md object-cover border"
              />
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
) : (
  <p className="text-center text-gray-500">No reviews found yet.</p>
)}

    </div>
  );
};

export default ReviewSection;
