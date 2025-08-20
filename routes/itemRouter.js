import express from 'express';
import { createItem, getItems, updateItem, deleteItem } from '../controllers/itemController.js';
import auth from '../middleware/auth.js';

const itemRouter = express.Router();

itemRouter.post('/', auth, createItem);
itemRouter.get('/', auth, getItems);
itemRouter.put('/:id', auth, updateItem);
itemRouter.delete('/:id', auth, deleteItem);

export default itemRouter;
