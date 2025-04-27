import express from 'express';
import { placeOrder, getMyOrders, getAllOrders, updateOrderStatus } from '../controllers/orderController.js';
import userAuth from '../middleware/userAuth.js';  // simple user check
import adminAuth from '../middleware/adminAuth.js'; // hardcore admin check

const router = express.Router();

// Normal User Routes
router.post('/', userAuth, placeOrder);
router.get('/my-orders', userAuth, getMyOrders);

// Admin Routes
router.get('/admin/orders', adminAuth, getAllOrders);
router.patch('/admin/orders/:orderId', adminAuth, updateOrderStatus);

export default router;
