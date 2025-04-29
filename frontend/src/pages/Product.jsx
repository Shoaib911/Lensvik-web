import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from "../config";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [reviews, setReviews] = useState([]);
  const [reviewError, setReviewError] = useState(false);
  

  
  const [newReview, setNewReview] = useState({ 
    name: '', 
    rating: 5,  // ⭐ Initial rating 5 (default)
    comment: '', 
    images: [] 
  });
  

  
  // Try-on state
  const [selectedTryonImage, setSelectedTryonImage] = useState(null);
  const [showTryOnModal, setShowTryOnModal] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);

 

  // Refs
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const faceMesh = useRef(null);
  const camera = useRef(null);

  
  useEffect(() => {
    const selectedProduct = products.find((item) => item._id === productId);
    if (selectedProduct) {
      setProductData(selectedProduct);
      setImage(selectedProduct.image[0]);
      setReviews(selectedProduct.reviews || []);
    }
  }, [productId, products]);

  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js';
    script1.async = true;
    
    const script2 = document.createElement('script');
    script2.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js';
    script2.async = true;
  
    document.body.appendChild(script1);
    document.body.appendChild(script2);
  
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);
  
  useEffect(() => {
    return () => {
      // Cleanup camera on unmount
      if (camera.current) {
        camera.current.stop();
        camera.current = null;
      }
      if (faceMesh.current) {
        faceMesh.current.close();
        faceMesh.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (showTryOnModal && selectedTryonImage) {
      const initTryOn = async () => {
        try {
          await startFaceMesh();
        } catch (err) {
          console.error("Try-on initialization failed:", err);
          toast.error("Failed to initialize virtual try-on");
          closeTryOnModal();
        }
      };
      initTryOn();
    }
  }, [showTryOnModal, selectedTryonImage]);


  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/reviews/product/${encodeURIComponent(productId)}`);
      if (response.data.success) {
        setReviews(response.data.reviews);
        setReviewError(false);
      } else {
        setReviewError(true);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviewError(true); // No toast
    }
  };
  

  useEffect(() => {
    const selectedProduct = products.find((item) => item._id === productId);
    if (selectedProduct) {
      setProductData(selectedProduct);
      setImage(selectedProduct.image[0]);
      fetchReviews(); // ✅ Fetch latest reviews from backend
    }
  }, [productId, products]);

  
 const startFaceMesh = async () => {
  faceMesh.current = new window.FaceMesh({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
  });

  faceMesh.current.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  faceMesh.current.onResults(onResults);

  camera.current = new window.Camera(webcamRef.current, {
    onFrame: async () => {
      await faceMesh.current.send({ image: webcamRef.current });
    },
    width: 640,
    height: 480,
  });

  camera.current.start();
};

const detectMobile = () => {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};


const onResults = (results) => {
  if (!canvasRef.current || !selectedTryonImage) return;

  const canvasCtx = canvasRef.current.getContext('2d');
  canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

  if (results.multiFaceLandmarks?.length > 0) {
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    const landmarks = results.multiFaceLandmarks[0];
    const leftTemple = landmarks[234];
    const rightTemple = landmarks[454];
    const nose = landmarks[6];

    const x1 = leftTemple.x * canvasRef.current.width;
    const y1 = leftTemple.y * canvasRef.current.height;
    const x2 = rightTemple.x * canvasRef.current.width;
    const y2 = rightTemple.y * canvasRef.current.height;
    const centerX = nose.x * canvasRef.current.width;
    const centerY = nose.y * canvasRef.current.height;

    const faceWidth = Math.max(10, Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2));
    const frameWidth = faceWidth * 1.18;

    const isMobile = detectMobile(); // Use updated helper
    const frameHeight = frameWidth * (isMobile ? 0.35 : 0.65);

    // ✅ Adjust alignment offsets only for mobile
    const offsetY = isMobile ? -frameHeight * 0.10 : -15; // vertical nudge down
    const offsetX = isMobile ?  frameWidth * 0.025 : 0;   // horizontal nudge right

    const minX = Math.max(0, centerX - frameWidth / 2 + offsetX);
    const minY = Math.max(0, centerY - frameHeight / 2 + offsetY);
    const maxX = Math.min(canvasRef.current.width, centerX + frameWidth / 2 + offsetX);
    const maxY = Math.min(canvasRef.current.height, centerY + frameHeight / 2 + offsetY);
    const visibleWidth = maxX - minX;
    const visibleHeight = maxY - minY;

    if (visibleWidth > 0 && visibleHeight > 0) {
      canvasCtx.drawImage(
        selectedTryonImage,
        minX,
        minY,
        visibleWidth,
        visibleHeight
      );
    }
  }
};




const handleTryOn = (product) => {
  if (!product.processedTryonImage) {
    toast.warning("This product doesn't have a try-on image yet");
    return;
  }

  const img = new Image();
  img.src = product.processedTryonImage;
  img.onload = () => {
    setSelectedTryonImage(img);
    setShowTryOnModal(true);
  };
  img.onerror = () => {
    toast.error("Failed to load try-on image");
  };
};
  

// Updated closeTryOnModal function
const closeTryOnModal = () => {
  // Stop all tracks
  if (webcamRef.current?.srcObject) {
    webcamRef.current.srcObject.getTracks().forEach(track => track.stop());
    webcamRef.current.srcObject = null;
  }

  // Clean up camera and face mesh
  if (camera.current) {
    try {
      camera.current.stop();
    } catch (err) {
      console.error("Error stopping camera:", err);
    }
    camera.current = null;
  }

  if (faceMesh.current) {
    try {
      faceMesh.current.close();
    } catch (err) {
      console.error("Error closing face mesh:", err);
    }
    faceMesh.current = null;
  }

  // Reset states
  setShowTryOnModal(false);
  setSelectedTryonImage(null);

};



const handleReviewSubmit = async (e) => {
  e.preventDefault();
  try {
    if (!newReview.name || !newReview.comment) {
      toast.error("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("name", newReview.name);
    formData.append("rating", newReview.rating);
    formData.append("comment", newReview.comment);
    newReview.images.forEach((file) => {
      if (file) formData.append("images", file);
    });

    const response = await axios.post(`${backendUrl}/api/reviews/create`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data.success) {
      toast.success("Review submitted successfully!");
      setNewReview({ name: '', rating: 5, comment: '', images: [] });
      fetchReviews();  // ✅ Refresh the reviews automatically after submit
    } else {
      toast.error(response.data.message || "Failed to submit review");
    }
  } catch (error) {
    console.error("Review submit error:", error);
    toast.error("Something went wrong while submitting review");
  }
};


  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...newReview.images];
      updatedImages[index] = file;
      setNewReview({ ...newReview, images: updatedImages });
    }
  };
  
  const handleRemoveImage = (index) => {
    const updatedImages = [...newReview.images];
    updatedImages[index] = null;
    setNewReview({ ...newReview, images: updatedImages });
  };
  

  return productData ? (
    <div className="pt-10 border-t-2">
      
     {/* Try On Modal - Simplified Version */}
{showTryOnModal && (
  <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
    <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
      <button
        onClick={closeTryOnModal}
        className="absolute top-4 right-4 text-2xl text-gray-700 hover:text-red-600 z-10"
      >
        ✕
      </button>

      <h2 className="text-xl font-semibold mb-4 text-center">
        Virtual Try-On: {productData.name}
      </h2>

      <div className="relative w-full flex justify-center">
        <video
          ref={webcamRef}
          autoPlay
          playsInline
          muted
          className="rounded-lg w-full h-auto max-h-[80vh] object-contain border border-gray-200"
        />
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>

      <div className="mt-4 text-center text-sm text-gray-600">
        <p>Position your face in the frame and hold still</p>
        <p className="text-xs text-gray-500 mt-1">
          Ensure good lighting and remove any obstructions
        </p>
      </div>
    </div>
  </div>
)}

      {/* Product Data */}
      <div className="flex flex-col gap-12 sm:flex-row">
        {/* Product Images */}
        <div className="flex flex-col-reverse flex-1 gap-3 sm:flex-row">
          <div className="flex justify-start overflow-x-auto sm:flex-col sm:overflow-y-scroll sm:w-[18%]">
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                onClick={() => setImage(item)}
                className={`w-[24%] sm:w-full cursor-pointer ${image === item ? 'border-2 border-gray-600 py-2 px-2' : ''}`}
                alt="Product Thumbnail"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto object-contain" alt="Main Product" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="mt-2 text-2xl font-medium">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-2">
  {(() => {
    const averageRating = reviews.length
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    return [...Array(5)].map((_, i) => {
      if (i + 1 <= Math.floor(averageRating)) {
        // Full Star
        return (
          <img
            key={i}
            src={assets.star_icon}
            alt="Full Star"
            className="w-4 h-4"
          />
        );
      } else if (i < averageRating) {
        // Half Star (Optional: Use half star icon)
        return (
          <img
            key={i}
            src={assets.half_star_icon || assets.star_icon} // ✅ Use your half star icon here if you have
            alt="Half Star"
            className="w-4 h-4 opacity-50"
          />
        );
      } else {
        // Empty Star
        return (
          <img
            key={i}
            src={assets.star_dull_icon}
            alt="Empty Star"
            className="w-4 h-4"
          />
        );
      }
    });
  })()}
  <p className="pl-2">({reviews.length})</p>
</div>


          <div className="mt-5">
            {productData.onSale ? (
              <div className="flex gap-3 items-center">
                <p className="text-3xl font-medium text-red-600">
                  {currency}{productData.salePrice.toFixed(2)}
                </p>
                <p className="text-lg line-through text-gray-500">
                  {currency}{productData.originalPrice.toFixed(2)}
                </p>
              </div>
            ) : (
              <p className="text-3xl font-medium">
                {currency}{productData.originalPrice.toFixed(2)}
              </p>
            )}
          </div>

          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

          {/* Try On Button */}
          {productData.processedTryonImage && (
            <button
              onClick={() => handleTryOn(productData)}
              className="flex items-center gap-2 bg-gray-300 px-8 mt-5 text-sm text-black border rounded-md hover:bg-gray-400 h-10"
            >
              <img src={assets.tryon_icon} alt="Try On" className="w-5 h-5" />
              Try On
            </button>
          )}

<div className="flex flex-col gap-4 my-8">
  <p>Select Size</p>
  <div className="flex gap-2 flex-wrap">
    {productData.sizes.map((item, index) => (
      <button
        key={index}
        onClick={() => setSize(item)}
        className={`border py-2 px-4 bg-gray-100 rounded-md ${item === size ? 'border-orange-500' : ''}`}
      >
        {item}
      </button>
    ))}
  </div>

  {/* View Size Chart Button */}
  <button
    onClick={() => setShowSizeChart(true)}
    className="mt-4 border border-gray-400 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 text-sm w-fit"
  >
    📏 View Size Chart
  </button>
</div>

{/* Size Chart Modal */}
{showSizeChart && (
  <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
    <div className="relative bg-white p-4 rounded-lg shadow-lg w-full max-w-3xl">
      
      {/* Close Button */}
      <button
        onClick={() => setShowSizeChart(false)}
        className="absolute top-4 right-4 text-2xl text-gray-700 hover:text-red-600 z-10"
      >
        ✕
      </button>

      {/* Heading */}
      <h2 className="text-xl font-semibold mb-4 text-center">
        Size Guide
      </h2>

      {/* Image perfectly fits without scroll */}
      <div className="flex justify-center items-center">
        <img 
          src={assets.size_chart}
          alt="Size Guide"
          className="max-w-full max-h-[80vh] object-contain rounded-md shadow-md"
        />
      </div>

    </div>
  </div>
)}


          <button
            onClick={() => addToCart(productData._id, size)}
            className="px-8 py-3 text-sm text-white bg-black active:bg-gray-700 w-full sm:w-auto"
          >
            ADD TO CART
          </button>

          {/* Buy on WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?phone=YOUR_PHONE_NUMBER&text=I'm%20interested%20in%20${productData.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-3 mt-3 text-sm text-white bg-green-500 rounded-md hover:bg-green-600 w-full sm:w-auto"
          >
            <img src={assets.whatsapp} alt="WhatsApp" className="w-5 h-5" />
            Buy on WhatsApp
          </a>
        </div>
      </div>

      <div className="mt-20 border px-6 py-6">
  <h3 className="text-lg font-semibold">Customer Reviews</h3>

  {reviewError ? (
    <p className="text-red-500 mt-4">⚠️ Failed to load reviews. Please try again later.</p>
  ) : reviews.length > 0 ? (
    reviews.map((review, index) => (
      <div key={index} className="border-b pb-6 mt-6">
        <p className="font-medium">{review.name}</p>
        <div className="flex gap-1">
          {Array(review.rating).fill().map((_, i) => (
            <img key={i} src={assets.star_icon} alt="Star" className="w-4 h-4" />
          ))}
        </div>
        <p className="text-gray-600 mt-2">{review.comment}</p>
        <div className="flex gap-2 mt-2">
          {review.images.map((img, i) => (
            <img key={i} src={img} alt="Review" className="w-16 h-16 rounded-md object-cover" />
          ))}
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-500 mt-4">No reviews yet. Be the first to review this product!</p>
  )}
</div>


    {/* Review Submission Form */}
<div className="mt-10 border px-6 py-6">
  <h3 className="text-lg font-semibold">Submit a Review</h3>
  <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4 mt-4">
    <input
      type="text"
      placeholder="Your Name"
      value={newReview.name}
      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
      className="p-2 border rounded-md"
      required
    />

    {/* ⭐⭐⭐⭐ Star Rating Input */}
    <div className="flex items-center gap-2">
      <p className="font-medium">Rating:</p>
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            onClick={() => setNewReview({ ...newReview, rating: index + 1 })}
            className={`w-6 h-6 cursor-pointer ${
              index < newReview.rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.12 3.438a1 1 0 00.95.69h3.641c.969 0 1.371 1.24.588 1.81l-2.946 2.146a1 1 0 00-.364 1.118l1.12 3.437c.3.921-.755 1.688-1.54 1.118l-2.946-2.147a1 1 0 00-1.176 0l-2.946 2.147c-.784.57-1.838-.197-1.54-1.118l1.12-3.437a1 1 0 00-.364-1.118L2.292 8.865c-.783-.57-.38-1.81.588-1.81h3.641a1 1 0 00.95-.69l1.12-3.438z" />
          </svg>
        ))}
      </div>
    </div>

    <textarea
      placeholder="Write your review..."
      value={newReview.comment}
      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
      className="p-2 border rounded-md"
      required
    ></textarea>

<div>
  <p className="font-medium mb-2">Upload Review Image(s)</p>
  
  {/* ✅ Flex Wrap for Mobile */}
  <div className="flex flex-wrap gap-4">
    {[...Array(4)].map((_, index) => (
      <div key={index} className="relative w-[45%] sm:w-24">
        <label
          className="flex flex-col items-center justify-center border-2 border-dashed rounded-md cursor-pointer text-gray-400 hover:border-gray-600 w-full h-24"
        >
          {newReview.images[index] ? (
            <img
              src={URL.createObjectURL(newReview.images[index])}
              alt="Selected"
              className="object-cover w-full h-full rounded-md"
            />
          ) : (
            <>
              <img
                src="https://img.icons8.com/ios/50/cloud-upload.png"
                alt="Upload Icon"
                className="w-8 h-8 opacity-60"
              />
              <span className="text-xs mt-1">Upload</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, index)}
            className="hidden"
          />
        </label>

        {/* ✕ Remove Button */}
        {newReview.images[index] && (
          <button
            type="button"
            onClick={() => handleRemoveImage(index)}
            className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full transform translate-x-1/2 -translate-y-1/2 hover:bg-red-700"
          >
            ✕
          </button>
        )}
      </div>
    ))}
  </div>
</div>

    <button
      type="submit"
      className="px-8 py-3 text-sm text-white bg-black active:bg-gray-700 mt-4"
    >
      Submit Review
    </button>
  </form>
</div>



      {/* At the bottom of your Product.jsx */}
<RelatedProducts 
  category={productData.categories?.[0]?.category} 
  subCategory={productData.categories?.[0]?.subCategories?.[0]}
  currentProductId={productId}  // Add this line
/>
    </div>
  ) : null;
};

export default Product;