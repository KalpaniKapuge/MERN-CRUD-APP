import express from 'express';
import { createCustomer, getCustomers, updateCustomer, deleteCustomer } from '../controllers/customerController.js';
import auth from '../middleware/auth.js';

const customerRouter = express.Router();

customerRouter.post('/', auth, createCustomer);
customerRouter.get('/', auth, getCustomers);
customerRouter.put('/:id', auth, updateCustomer);
customerRouter.delete('/:id', auth, deleteCustomer);

export default customerRouter;
