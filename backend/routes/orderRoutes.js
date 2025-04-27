import express from 'express';
import { placeOrder, getMyOrders, getAllOrders, updateOrderStatus, cancelMyOrder } from '../controllers/orderController.js';
import userAuth from '../middleware/userAuth.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// Normal User Routes
router.post('/', userAuth, placeOrder);
router.get('/my-orders', userAuth, getMyOrders);
router.patch('/cancel/:orderId', userAuth, cancelMyOrder); // <-- NOW it will work

// Admin Routes
router.get('/admin/orders', adminAuth, getAllOrders);
router.patch('/admin/orders/:orderId', adminAuth, updateOrderStatus);

export default router;
