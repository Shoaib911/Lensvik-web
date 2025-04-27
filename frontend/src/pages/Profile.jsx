import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const Profile = () => {
  const { orders, currency, products, fetchOrders } = useContext(ShopContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(storedUser);
    fetchOrders(); // Fetch latest orders when user opens profile
  }, [navigate, fetchOrders]);

  return (
    <div className="min-h-screen pt-16 bg-gray-100 px-4 md:px-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">

        {/* Profile Header */}
        {user && (
          <div className="flex items-center gap-4 border-b pb-4">
            <img
              src={assets.profile_icon}
              alt="Profile"
              className="w-20 h-20 rounded-full border"
            />
            <div>
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
        )}

        {/* Personal Info Section */}
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <Title text1="PERSONAL" text2="INFORMATION" />
          <p className="mt-2"><strong>Email:</strong> {user?.email || "Not Provided"}</p>
          <p><strong>Phone:</strong> {user?.phone || "Not Provided"}</p>
          <p><strong>Address:</strong> {user?.address || "Not Provided"}</p>
        </div>

        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
  <Title text1="ORDER" text2="HISTORY" />

  {orders.length === 0 ? (
    <p className="text-gray-500 mt-2">No orders placed yet.</p>
  ) : (
    <div className="flex flex-col gap-6 mt-4">
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white border rounded-lg shadow-sm overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-start p-4 border-b">
            <div>
              <p className="font-semibold text-sm md:text-base">Order ID: {order._id.slice(0, 10)}...</p>
              <p className="text-gray-400 text-xs mt-1">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full
                ${order.status === "Processing" ? "bg-yellow-100 text-yellow-600" : ""}
                ${order.status === "Shipped" ? "bg-blue-100 text-blue-600" : ""}
                ${order.status === "Delivered" ? "bg-green-100 text-green-600" : ""}
                ${order.status === "Cancelled" ? "bg-red-100 text-red-600" : ""}
              `}
            >
              {order.status}
            </span>
          </div>

          {/* Items */}
          <div className="p-4 flex flex-col gap-4">
            {Object.keys(order.items).map((productId) => {
              const product = products.find((p) => p._id === productId);
              const sizes = order.items[productId];

              return (
                product &&
                Object.keys(sizes).map((size) => {
                  const quantity = sizes[size];
                  if (quantity <= 0) return null;
                  const unitPrice = product.onSale ? product.salePrice : product.originalPrice;

                  return (
                    <div key={size} className="flex items-center gap-4">
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{product.name}</p>
                        <p className="text-gray-400 text-xs">Size: {size}</p>
                        <p className="text-gray-400 text-xs">Qty: {quantity}</p>
                      </div>
                      <p className="font-semibold text-sm text-gray-700">
                        {currency}
                        {(unitPrice * quantity).toFixed(2)}
                      </p>
                    </div>
                  );
                })
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center bg-gray-50 px-4 py-3 border-t">
            <p className="text-gray-500 text-sm">Total</p>
            <p className="font-bold text-gray-800">
              {currency}{order.totalAmount.toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>


      </div>
    </div>
  );
};

export default Profile;
