import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react"; // Import delete icon
import PropTypes from "prop-types";

const List = ({ token }) => {
  const [listProducts, setListProducts] = useState([]);

  // Fetch products from API
  const fetchListProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setListProducts(response.data.products);
      } else {
        toast.error(response.data.message || "Failed to load products.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error fetching product list.");
    }
  };

  // Remove product with confirmation
  const removeProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Product removed successfully.");
        fetchListProducts(); // Refresh list
      } else {
        toast.error(response.data.message || "Failed to remove product.");
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("Error removing product.");
    }
  };

  useEffect(() => {
    fetchListProducts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product List</h2>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-[0.5fr_1fr_1.5fr_1fr_1fr_0.5fr_0.2fr] items-center py-2 px-3 border-b bg-gray-200 text-lg text-center font-semibold">
        <span>Image</span>
        <span>Name</span>
        <span>Description</span>
        <span>Category</span>
        <span>Brand</span>
        <span>Price</span>
        <span>Action</span>
      </div>

      {/* Product List */}
      {listProducts.length > 0 ? (
        listProducts.map((item) => (
          <div
            className="grid grid-cols-[0.5fr_1fr_1.5fr_1fr_1fr_0.5fr_0.2fr] items-center gap-2 py-2 px-3 border-b text-sm text-center"
            key={item._id}
          >
            <img
              className="w-16 h-16 object-cover rounded border"
              src={item.image?.[0] || "/default-image.jpg"}
              alt={item.name}
            />
            <p className="text-left font-medium">{item.name}</p>
            <p className="text-left truncate">{item.description}</p>
            <p className="capitalize">{item.category}</p>
            <p className="capitalize">{item.brand || "N/A"}</p>
            <p className="font-semibold text-green-600">
              {item.originalPrice ? currency(item.originalPrice) : "N/A"}
            </p>
            <button
              onClick={() => removeProduct(item._id)}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
              title="Delete Product"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-4">No products found.</p>
      )}
    </div>
  );
};
List.propTypes = {
  token: PropTypes.string.isRequired,
};

export default List;
