import { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const Profile = () => {
  const { orders, setOrders } = useContext(ShopContext);

  // State for user info
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    // Load user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user")) || {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "+1 234 567 890",
      address: "123 Main St, New York, USA",
    };
    setUser(storedUser);

    // Load orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    if (setOrders) {
      setOrders(storedOrders);
    }
  }, [setOrders]);

  return (
    <div className="min-h-screen pt-16 bg-gray-100">
      <div className="max-w-4xl p-6 mx-auto bg-white shadow-md rounded-lg">
        {/* Profile Header */}
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

        {/* Sections */}
        <div className="mt-6">
          {/* Personal Info */}
          <div className="p-4 border rounded-lg bg-gray-50">
            <Title text1={"PERSONAL"} text2={"INFORMATION"} />
            <p className="mt-2"><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <button className="mt-3 px-4 py-2 text-sm text-white bg-blue-600 rounded">
              Edit Info
            </button>
          </div>

          {/* Order History */}
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <Title text1={"ORDER"} text2={"HISTORY"} />
            {orders.length === 0 ? (
              <p className="text-gray-500 mt-2">No orders placed yet.</p>
            ) : (
              <ul className="mt-2">
                {orders.map((order) => (
                  <li key={order.id} className="p-2 border-b">
                    <p className="font-medium">Order ID: {order.id}</p>
                    <p className="text-gray-500">Date: {order.date} | Status: {order.status}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Wishlist */}
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <Title text1={"YOUR"} text2={"WISHLIST"} />
            <p className="text-gray-500 mt-2">You have no items in your wishlist.</p>
          </div>

          {/* Reviews & Ratings */}
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <Title text1={"YOUR"} text2={"REVIEWS"} />
            <p className="text-gray-500 mt-2">No reviews added yet.</p>
          </div>

          {/* Account Settings */}
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <Title text1={"ACCOUNT"} text2={"SETTINGS"} />
            <button className="block mt-2 text-blue-600">Change Password</button>
            <button className="block mt-2 text-blue-600">Notification Preferences</button>
            <button className="block mt-2 text-red-600">Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
