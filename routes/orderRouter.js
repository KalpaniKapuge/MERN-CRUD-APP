import express from 'express';
import { createOrder, getOrders } from '../controllers/orderController';
import auth from '../middleware/auth.js';


const orderRouter = express.Router();

router.post('/', auth, createOrder);
router.get('/', auth, getOrders);

export default orderRouter;