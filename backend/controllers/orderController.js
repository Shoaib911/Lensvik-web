import Order from "../models/Order.js";

// Place a new order
export const placeOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount } = req.body;

    if (!items || !shippingAddress || !paymentMethod || !totalAmount) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const newOrder = new Order({
      userId: req.user.id, // from auth middleware
      items,
      shippingAddress,
      paymentMethod,
      totalAmount
    });

    await newOrder.save();

    res.status(201).json({ success: true, message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get orders of logged-in user
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Admin: Get all orders
export const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, orders });
    } catch (error) {
      console.error("Error fetching admin orders:", error);
      res.status(500).json({ success: false, message: "Server Error fetching orders" });
    }
  };

// Admin: Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ success: true, message: 'Order status updated', order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
