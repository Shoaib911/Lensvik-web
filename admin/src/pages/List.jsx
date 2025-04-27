import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { Trash2, Edit, Search } from "lucide-react";
import PropTypes from "prop-types";
import EditProduct from "../components/EditProduct";

const List = ({token}) => {
  const [listProducts, setListProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

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

  const removeProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success("Product removed successfully.");
        fetchListProducts();
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

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const formatCategories = (categories) => {
    if (!categories) return "N/A";

    if (Array.isArray(categories) && categories[0]?.category) {
      return categories.map((cat, index) => (
        <div key={index} className="text-left">
          <span className="font-medium">{cat.category}:</span>
          {cat.subCategories?.length > 0 && (
            <span className="text-sm ml-1">{cat.subCategories.join(", ")}</span>
          )}
        </div>
      ));
    } else if (Array.isArray(categories)) {
      return <div className="text-left">{categories.join(", ")}</div>;
    } else {
      return <div className="text-left">{categories}</div>;
    }
  };

  const filteredProducts = listProducts.filter((item) => {
    const nameMatch = item.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const brandMatch = item.brand?.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = Array.isArray(item.categories)
      ? item.categories.some(cat =>
          cat?.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (cat.subCategories || []).some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      : typeof item.category === "string" && item.category.toLowerCase().includes(searchTerm.toLowerCase());

    return nameMatch || brandMatch || categoryMatch;
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Product List</h2>

      {/* Search Bar */}
      <div className="mb-6 relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by product name/category/brand..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-2 py-3 px-4 border-b bg-gray-100 font-semibold text-sm">
        <div className="col-span-1 text-center">Image</div>
        <div className="col-span-2">Name</div>
        <div className="col-span-3">Description</div>
        <div className="col-span-2">Categories</div>
        <div className="col-span-1">Brand</div>
        <div className="col-span-1 text-right">Price</div>
        <div className="col-span-2 text-center">Edit / Delete</div>
      </div>

      {/* Product List */}
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item) => (
          <div
            className="grid grid-cols-12 gap-2 py-3 px-4 border-b text-sm items-center"
            key={item._id}
          >
            {/* Image */}
            <div className="col-span-1 flex justify-center">
              <img
                className="w-12 h-12 object-cover rounded border"
                src={item.image?.[0] || "/default-image.jpg"}
                alt={item.name}
              />
            </div>

            {/* Name */}
            <div className="col-span-2 font-medium truncate">{item.name}</div>

            {/* Description */}
            <div className="col-span-3 line-clamp-2 text-gray-600">{item.description}</div>

            {/* Categories */}
            <div className="col-span-2">
              {formatCategories(item.categories || item.category)}
            </div>

            {/* Brand */}
            <div className="col-span-1 capitalize">{item.brand || "N/A"}</div>

            {/* Price */}
            <div className="col-span-1 text-right font-semibold text-green-600">
              {item.originalPrice ? currency(item.originalPrice) : "N/A"}
              {item.onSale && item.salePrice && (
                <div className="text-xs text-red-500 line-through">
                  {currency(item.salePrice)}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="col-span-2 flex justify-center space-x-3">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-500 hover:text-blue-700 transition"
                title="Edit Product"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => removeProduct(item._id)}
                className="text-red-500 hover:text-red-700 transition"
                title="Delete Product"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 py-6">No products found.</div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingProduct && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
    <div className="bg-white rounded-lg w-full max-w-3xl max-h-[80vh] flex flex-col">
      {/* Scrollable Content */}
      <div className="overflow-y-auto p-6 flex-1">
      <EditProduct
  token={token} // ✅ ADD THIS!
  productData={editingProduct}
  onClose={() => setShowEditModal(false)}
  onUpdated={() => {
    fetchListProducts();
    setShowEditModal(false);
  }}
/>

      </div>
    </div>
  </div>
)}

    </div>
  );
};

List.propTypes = {
  token: PropTypes.string.isRequired,
};

export default List;
