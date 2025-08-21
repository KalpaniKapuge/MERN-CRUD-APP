import express from 'express';
import { getOrderHistory } from '../controllers/orderHistoryController.js';

const OrderHistoryRouter = express.Router();


OrderHistoryRouter.get('/', getOrderHistory);

export default OrderHistoryRouter;