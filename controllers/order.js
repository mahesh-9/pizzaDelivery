
const mongoose = require('mongoose');

const Order = require('../models/order');

//mongoose.set('useFindAndModify', false);

// View all orders
exports.getOrders = async(req, res) => {
	Order.find({}, (err, ord)=> {
		if (err) throw err; 
		res.status(200).json(ord);
	})
};

// View orders based on one user id
exports.getUserOrder = async(req, res) => {
	Order.find({userId: req.params.id }, (err, ord) => {
		if (err) throw err;
		res.status(200).json(ord);
	})

};

//create order
exports.createOrder = (req, res) => {
	/*
	var order = new Order({
		_id:mongoose.Types.ObjectId(),
		user: req.body.userId,
		product:req.body.orderId,
		quantity: req.body.quantity,
		totalPrice: req.body.totalPrice,
		status: req.body.status,
		orderType: req.body.orderType,
		dateTimePlaced: req.body.dateTimePlaced,
		deliveryAddress: req.body.deliveryAddress,
		feedback_rating: req.body.feedback_rating,
		isCancelled: false
	})*/
	var order = new Order(req.body);
	console.log("request body",req.body);
	order.save(function (err, order) {
		if (err) throw err;	
		console.log("order saved :",order);
		res.status(201).json(order);
	})
};

//Update Order
exports.updateOrder = async (req, res) => {
	console.log(req.body);
	Order.findByAndUpdate(req.params.id, req.body, (err, updated) => {
		if (err) throw err;
		res.status(200).json({
			message: "Order updated successfully"
		})
	})
};

// Update quantity in order
exports.updateQuantity = async(req, res)=>{
	console.log(req.body);
	Order.updateOne({_id: req.params.id, "items._product": req.params.productid }, 
		{$set: {"items.$.quantity": req.body.quantity}},(err, updated) => {
		if (err) throw err;
		res.status(200).json({
			message: "Order quantity updated successfully"
		})
	})
};


//Delete Order
exports.deleteOrder = async (req, res) => {
	Order.findByIdAndUpdate(req.params.id, { status: "Cancelled" }, (err, updated) => {
		if (err) throw err;
		res.status(200).json({
			message: "Order is deleted successfully"
		})
	})
};