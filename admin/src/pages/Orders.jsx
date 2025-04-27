import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { Search } from "lucide-react";
import PropTypes from "prop-types";

const Orders = ({ token }) => {
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

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/orders/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message || "Failed to load orders.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching order list.");
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
        fetchOrders(); // Refresh list
      } else {
        toast.error(response.data.message || "Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Error updating status.");
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  // Search by orderId, email, or mobile
  const filteredOrders = orders.filter(order =>
    order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (order.shippingAddress?.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (order.shippingAddress?.mobile || "").includes(searchTerm)
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Orders</h2>

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
          <div
            className="grid grid-cols-12 gap-2 py-3 px-4 border-b text-sm items-center"
            key={order._id}
          >
            <div className="col-span-2 truncate">{order._id}</div>
            <div className="col-span-3 truncate">{order.shippingAddress?.email}</div>
            <div className="col-span-2 text-center">{new Date(order.createdAt).toLocaleDateString()}</div>
            <div className="col-span-2 text-center font-semibold">
              {currency(order.totalAmount)}
            </div>
            <div className="col-span-2 flex justify-center">
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                className="text-sm border px-2 py-1 rounded bg-gray-50"
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
        <div className="text-center text-gray-500 py-6">No orders found.</div>
      )}

      {/* View Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="overflow-y-auto p-6 flex-1">
              <h3 className="text-xl font-bold mb-4">Order Details</h3>

              {/* Customer Info */}
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Shipping Address:</h4>
                <p>{selectedOrder.shippingAddress?.firstName} {selectedOrder.shippingAddress?.lastName}</p>
                <p>{selectedOrder.shippingAddress?.street}</p>
                <p>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} {selectedOrder.shippingAddress?.zipCode}</p>
                <p>{selectedOrder.shippingAddress?.country}</p>
                <p>Email: {selectedOrder.shippingAddress?.email}</p>
                <p>Mobile: {selectedOrder.shippingAddress?.mobile}</p>
              </div>

              {/* Ordered Items */}
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Ordered Items:</h4>
                {Object.keys(selectedOrder.items).map((productId) => {
                  const product = products.find(p => p._id === productId);
                  return product ? (
                    Object.keys(selectedOrder.items[productId]).map((size) => (
                      <div key={size} className="flex gap-4 mb-4 items-center">
                        {/* Product Images (max 2) */}
                        <div className="flex gap-2">
                          {product.image?.slice(0, 2).map((imgUrl, idx) => (
                            <img
                              key={idx}
                              src={imgUrl}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded border"
                            />
                          ))}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1">
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-sm text-gray-500">Size: {size}</p>
                          <p className="text-sm text-gray-500">Quantity: {selectedOrder.items[productId][size]}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div key={productId}>Product not found</div>
                  );
                })}
              </div>

              {/* Total Amount */}
              <div className="font-bold">
                Total Amount: {currency(selectedOrder.totalAmount)}
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

Orders.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Orders;
