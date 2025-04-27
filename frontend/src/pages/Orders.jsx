import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { orders, currency, products, fetchOrders } = useContext(ShopContext);

  useEffect(() => {
    fetchOrders(); // Fetch latest orders when page loads
  }, []);

  return (
    <div className="pt-16 border-t bg-gray-50 min-h-screen px-4 md:px-10">
      <div className="text-center mb-6">
        <Title text1="Your" text2="Orders" />
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center mt-8 text-lg">
          You have not placed any orders yet.
        </p>
      ) : (
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-5 flex flex-col gap-4"
            >
              {/* Order Header */}
              <div className="flex justify-between items-start flex-wrap">
                <div className="text-sm sm:text-base">
                  <p className="font-semibold break-all">Order ID: {order._id}</p>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`mt-2 sm:mt-0 px-3 py-1 text-xs sm:text-sm font-medium rounded-full 
                    ${order.status === "Processing" ? "bg-yellow-100 text-yellow-600" : ""}
                    ${order.status === "Shipped" ? "bg-blue-100 text-blue-600" : ""}
                    ${order.status === "Delivered" ? "bg-green-100 text-green-600" : ""}
                    ${order.status === "Cancelled" ? "bg-red-100 text-red-600" : ""}
                  `}
                >
                  {order.status}
                </span>
              </div>

              {/* Order Items */}
              <div className="flex flex-col gap-4">
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
                        <div
                          key={size}
                          className="flex flex-col sm:flex-row sm:items-center gap-4 border-t pt-4"
                        >
                          <img
                            src={product.image[0]}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1 text-sm sm:text-base">
                            <p className="font-semibold text-gray-700">{product.name}</p>
                            <p className="text-gray-500 text-xs">Size: {size}</p>
                            <p className="text-gray-500 text-xs">Quantity: {quantity}</p>
                          </div>
                          <p className="font-semibold text-gray-800">
                            {currency}{(unitPrice * quantity).toFixed(2)}
                          </p>
                        </div>
                      );
                    })
                  );
                })}
              </div>

              {/* Order Total */}
              <div className="flex justify-between items-center font-semibold text-lg pt-2 border-t">
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
