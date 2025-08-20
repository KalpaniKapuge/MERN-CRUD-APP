import express from 'express';
import { createItem, getItems, updateItem, deleteItem } from '../controllers/itemController.js';
import auth from '../middleware/auth.js';

const itemRouter = express.Router();

router.post('/', auth, createItem);
router.get('/', auth, getItems);
router.put('/:id', auth, updateItem);
router.delete('/:id', auth, deleteItem);

export default itemRouter;