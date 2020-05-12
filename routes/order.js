const express = require('express');

const { getOrders, getUserOrder, createOrder, updateOrder, updateQuantity, deleteOrder } = require('../controllers/order');

const router = express.Router();

//get all orders
router.get('/order', getOrders);

//get by userid
router.get('/order/:id', getUserOrder);

router.put('/order/:id', updateOrder);

//update qunatity
router.put('/:id/user/:productid/product',updateQuantity)

//create order
router.post('/order', createOrder);

//delete order
router.delete('/order/:id', deleteOrder);

module.exports = router;

