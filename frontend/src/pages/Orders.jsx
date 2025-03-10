import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { orders, currency, products } = useContext(ShopContext);

  return (
    <div className="pt-16 border-t bg-gray-50 min-h-screen px-4 md:px-10">
      <div className="text-center mb-6">
        <Title text1="Your" text2="Orders" />
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center mt-8 text-lg">
          You havent placed any orders yet.
        </p>
      ) : (
        <div className="max-w-4xl mx-auto">
          {orders.map((order, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-6">
              {/* Order Header */}
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <p className="font-semibold text-lg">Order ID: {order.id}</p>
                  <p className="text-gray-500 text-sm">Date: {order.date}</p>
                </div>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full 
                  ${order.status === "Processing" ? "bg-yellow-100 text-yellow-600" : ""}
                  ${order.status === "Shipped" ? "bg-blue-100 text-blue-600" : ""}
                  ${order.status === "Delivered" ? "bg-green-100 text-green-600" : ""}`}
                >
                  {order.status}
                </span>
              </div>

              {/* Order Items */}
              <div className="mt-4">
                {Object.keys(order.items).map((productId) => {
                  const product = products.find((p) => p._id === productId);
                  return Object.keys(order.items[productId]).map((size) => (
                    <div key={size} className="flex items-center gap-4 border-b py-4">
                      <img className="w-16 h-16 object-cover rounded-lg" src={product.image[0]} alt={product.name} />
                      <div className="flex-1">
                        <p className="font-medium text-gray-700">{product.name}</p>
                        <p className="text-sm text-gray-500">Size: {size}</p>
                        <p className="text-sm text-gray-500">Quantity: {order.items[productId][size]}</p>
                      </div>
                      <p className="font-semibold text-gray-800">
                        {currency}{(product.price * order.items[productId][size]).toFixed(2)}
                      </p>
                    </div>
                  ));
                })}
              </div>

              {/* Order Total */}
              <div className="mt-4 flex justify-between items-center font-semibold text-lg">
                <p>Total:</p>
                <p>{currency}{order.totalAmount.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
