import { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import axios from "axios";
import { Search } from "lucide-react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const DeliveredOrders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message || "Failed to load products.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error fetching product list.");
    }
  };

  // Fetch Delivered Orders only
  const fetchDeliveredOrders = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/orders/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        const delivered = response.data.orders.filter(order => order.status === "Delivered");
        setOrders(delivered);
      } else {
        toast.error(response.data.message || "Failed to load orders.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching delivered orders.");
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.patch(`${backendUrl}/api/orders/admin/orders/${orderId}`, {
        status: newStatus,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        toast.success("Order status updated!");
        fetchDeliveredOrders();
      } else {
        toast.error(response.data.message || "Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Error updating status.");
    }
  };

  useEffect(() => {
    fetchDeliveredOrders();
    fetchProducts();
  }, []);

  const filteredOrders = orders.filter(order =>
    order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (order.shippingAddress?.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (order.shippingAddress?.mobile || "").includes(searchTerm)
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Delivered Orders</h2>

      {/* Search Bar */}
      <div className="mb-6 relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by order ID, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-2 py-3 px-4 border-b bg-gray-100 font-semibold text-sm">
        <div className="col-span-2">Order ID</div>
        <div className="col-span-3">Customer Email</div>
        <div className="col-span-2 text-center">Date</div>
        <div className="col-span-2 text-center">Total</div>
        <div className="col-span-2 text-center">Status</div>
        <div className="col-span-1 text-center">Action</div>
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <div key={order._id} className="grid grid-cols-12 gap-2 py-3 px-4 border-b text-sm items-center">
            <div className="col-span-2 truncate" title={order._id}>
              #{order._id.slice(0, 6)}...{order._id.slice(-4)}
            </div>
            <div className="col-span-3 truncate" title={order.shippingAddress?.email}>{order.shippingAddress?.email}</div>
            <div className="col-span-2 text-center">{new Date(order.createdAt).toLocaleDateString()}</div>
            <div className="col-span-2 text-center font-semibold">{currency(order.totalAmount)}</div>
            <div className="col-span-2 flex justify-center">
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                className={`text-sm border px-2 py-1 rounded font-semibold ${
                  order.status === "Processing" ? "bg-yellow-100 text-yellow-800" :
                  order.status === "Shipped" ? "bg-blue-100 text-blue-800" :
                  order.status === "Delivered" ? "bg-green-100 text-green-800" :
                  order.status === "Cancelled" ? "bg-red-100 text-red-800" :
                  "bg-gray-100 text-gray-800"
                }`}
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="col-span-1 flex justify-center">
              <button
                onClick={() => setSelectedOrder(order)}
                className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
              >
                View
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 py-6">No delivered orders found.</div>
      )}

      {/* View Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto px-2">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="overflow-y-auto p-6 flex-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Order Details</h3>
              <div className="flex items-center gap-2 mb-6">
                <p className="text-sm text-gray-600">Order ID: <span className="font-mono">{selectedOrder._id}</span></p>
                <button 
                  onClick={() => navigator.clipboard.writeText(selectedOrder._id)}
                  className="text-xs text-blue-500 underline hover:text-blue-600"
                >
                  Copy
                </button>
              </div>

              {/* Shipping Address */}
              <div className="bg-gray-50 p-5 rounded-lg shadow mb-8">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Shipping Address</h4>
                <div className="text-gray-600 space-y-1 text-sm leading-relaxed">
                  <p><span className="font-semibold text-gray-800">Name:</span> {selectedOrder.shippingAddress?.firstName} {selectedOrder.shippingAddress?.lastName}</p>
                  <p><span className="font-semibold text-gray-800">Address:</span> {selectedOrder.shippingAddress?.street}</p>
                  <p><span className="font-semibold text-gray-800">City:</span> {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} {selectedOrder.shippingAddress?.zipCode}</p>
                  <p><span className="font-semibold text-gray-800">Country:</span> {selectedOrder.shippingAddress?.country}</p>
                  <p><span className="font-semibold text-gray-800">Email:</span> {selectedOrder.shippingAddress?.email}</p>
                  <p><span className="font-semibold text-gray-800">Mobile:</span> {selectedOrder.shippingAddress?.mobile}</p>
                </div>
              </div>

              {/* Ordered Items */}
              <div className="mb-8">
                <h4 className="font-bold text-lg mb-4 border-b pb-2 text-gray-800">Ordered Items</h4>
                <div className="space-y-4">
                  {Object.keys(selectedOrder.items).map((productId) => {
                    const product = products.find(p => p._id === productId);
                    if (!product) return null;

                    return Object.keys(selectedOrder.items[productId]).map((size) => {
                      const quantity = selectedOrder.items[productId][size];
                      if (quantity <= 0) return null;

                      return (
                        <div 
                          key={size}
                          className="flex gap-4 items-center p-4 border rounded-lg shadow hover:shadow-md transition bg-white"
                        >
                          {/* Product Image */}
                          <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                            <img 
                              src={product.image?.[0]} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                              <p className="font-semibold text-gray-800">{product.name}</p>
                              <p className="text-sm text-gray-500 mt-1 sm:mt-0">
                                ${product.onSale ? product.salePrice.toFixed(2) : product.originalPrice.toFixed(2)} each
                              </p>
                            </div>

                            <div className="flex gap-8 mt-2 text-sm text-gray-600">
                              <p>Size: <span className="font-semibold text-gray-700">{size}</span></p>
                              <p>Quantity: <span className="font-semibold text-gray-700">{quantity}</span></p>
                            </div>
                          </div>
                        </div>
                      );
                    });
                  })}
                </div>
              </div>

              {/* Total Amount */}
              <div className="flex justify-between items-center pt-6 mt-6 border-t text-lg font-semibold text-gray-800">
                <span>Total Amount:</span>
                <span>{currency(selectedOrder.totalAmount)}</span>
              </div>
            </div>

            {/* Close Button */}
            <div className="border-t p-4 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    
    </div>
  );
};

DeliveredOrders.propTypes = {
  token: PropTypes.string,
};

export default DeliveredOrders;
