import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [reviews, setReviews] = useState([]); // Store reviews
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '', images: [] });
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const selectedProduct = products.find((item) => item._id === productId);
    if (selectedProduct) {
      setProductData(selectedProduct);
      setImage(selectedProduct.image[0]);
      setReviews(selectedProduct.reviews || []);
    }
  }, [productId, products]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) {
      alert('Please fill in all fields.');
      return;
    }

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    setNewReview({ name: '', rating: 5, comment: '', images: [] });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    setNewReview({ ...newReview, images: files });
  };

  return productData ? (
    <div className="pt-10 border-t-2">

      {/* Try On Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <p className="text-lg font-semibold">Feature Coming Soon</p>
            <button onClick={() => setShowPopup(false)} className="mt-4 px-6 py-2 bg-black text-white rounded-md">
              Close
            </button>
          </div>
        </div>
      )}


      {/* Product Data */}
      <div className="flex flex-col gap-12 sm:flex-row">
        {/* Product Images */}
        <div className="flex flex-col-reverse flex-1 gap-3 sm:flex-row">
          <div className="flex justify-start overflow-x-auto sm:flex-col sm:overflow-y-scroll sm:w-[18.7%]">
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                onClick={() => setImage(item)}
                className={`w-[24%] sm:w-full cursor-pointer ${
                  image === item ? 'border-2 border-gray-600 py-2 px-2' : ''
                }`}
                alt="Product"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" alt="Product" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="mt-2 text-2xl font-medium">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="Ratings" className="w-3 h-3" />
            ))}
            <p className="pl-2">({reviews.length})</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

          {/* Try On Button */}
          <button 
            onClick={() => setShowPopup(true)}
            className="flex items-center gap-2 bg-gray-300 px-8 mt-5 text-sm text-black border rounded-md hover:bg-gray-400 h-10"
          >
            <img src={assets.tryon_icon} alt="Try On" className="w-5 h-5" />
            Try On
          </button>
            
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
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
          </div>

          <button 
            onClick={() => addToCart(productData._id, size)} 
            className="px-8 py-3 text-sm text-white bg-black active:bg-gray-700"
          >
            ADD TO CART
          </button>

          {/* Buy on WhatsApp */}
          <a 
            href={`https://api.whatsapp.com/send?phone=YOUR_PHONE_NUMBER&text=I'm%20interested%20in%20${productData.name}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-3 mt-3 text-sm text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            <img src={assets.whatsapp} alt="WhatsApp" className="w-10 h-10" />
            Buy on WhatsApp
          </a>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-20 border px-6 py-6">
        <h3 className="text-lg font-semibold">Customer Reviews</h3>

        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="border-b pb-6 mt-6">
              <p className="font-medium">{review.name}</p>
              <div className="flex gap-1">
                {Array(review.rating)
                  .fill()
                  .map((_, i) => (
                    <img
                      key={i}
                      src={assets.star_icon}
                      alt="Star"
                      className="w-4 h-4"
                    />
                  ))}
              </div>
              <p className="text-gray-600 mt-2">{review.comment}</p>
              <div className="flex gap-2 mt-2">
                {review.images.map((img, i) => (
                  img instanceof File && (
                    <img
                      key={i}
                      src={URL.createObjectURL(img)}
                      alt="Review"
                      className="w-16 h-16 rounded-md object-cover"
                    />
                  )
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-4">
            No reviews yet. Be the first to review this product!
          </p>
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
          <textarea
            placeholder="Write your review..."
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="p-2 border rounded-md"
            required
          ></textarea>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="p-2 border rounded-md"
          />
          <button type="submit" className="px-8 py-3 text-sm text-white bg-black active:bg-gray-700">
            Submit Review
          </button>
        </form>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : null;
};

export default Product;
