import { createContext, useEffect, useState } from "react";
//import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from 'axios';
import { backendUrl } from "../backendUrl"; // import backend URL

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
   const [products, setProducts] = useState([]); // Fetch this from backend now

  const currency = "$";
  const delivery_fee = 10;

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

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
      toast.error("Error fetching products from server.");
    }
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please Select a Size");
      return;
    } else {
      toast.success("Item Added To The Cart");
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
  };

  const updateQuantity = async (itemId, size, quantity) => {
    if (quantity === 0) {
      toast.success("Item Removed From The Cart");
    }

    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch {
          // error
        }
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const productId in cartItems) {
      const productInfo = products.find((product) => product._id === productId);
      if (!productInfo) continue; // Skip if product not found (important)
  
      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];
        if (quantity > 0) {
          // Correct price: If onSale use salePrice, otherwise originalPrice
          const unitPrice = productInfo.onSale ? productInfo.salePrice : productInfo.originalPrice;
          totalAmount += unitPrice * quantity;
        }
      }
    }
    return totalAmount;
  };
  

  const placeOrder = async (navigate) => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
  
      if (!token) {
        toast.error("Please login to place order");
        navigate("/login");
        return;
      }
  
      if (Object.keys(cartItems).length === 0) {
        toast.error("Your cart is empty!");
        return;
      }
  
      const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
      if (!shippingAddress) {
        toast.error("Shipping address not found! Please fill the form.");
        navigate("/place-order");
        return;
      }
  
      const paymentMethod = localStorage.getItem("paymentMethod") || "cod";
  
      const response = await axios.post(`${backendUrl}/api/orders`, {
        items: cartItems,
        shippingAddress,
        paymentMethod,
        totalAmount: getCartAmount() + delivery_fee,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data.success) {
        setCartItems({});
        toast.success("Order placed successfully!");
        navigate("/orders");
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Place Order Error:", error);
      toast.error("Server error. Please try again later.");
    }
  };
  

  const fetchOrders = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;

      const response = await axios.get(`${backendUrl}/api/orders/my-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error("Failed to fetch orders.");
      }
    } catch (error) {
      console.error("Fetch Orders Error:", error);
      toast.error("Server error while fetching orders.");
    }
  };
  

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    orders,
    placeOrder,
    setOrders,
    fetchOrders,
    fetchProducts,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
