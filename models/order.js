const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    productName: String,
    category: String,
    description: String,
    price: String,
    size: String,
    crust: String,
    toppings: String,
    image: String,
    extra: [
        {
            ingredient: String,
        }
    ],
    quantity: {type:Number,default: 1}
});


const orderSchema = new mongoose.Schema({
    name:{type: String, default: "Mahesh"},
    userId: {
        type:String,
    },
    items: {type :[productSchema], default:[]},
    deliveryAddress:{
        addressLine1:String,
        addressLine2:String,
        city:String,
        state:String,
        zip:String,
        country:String
    },
    paymentDetails:{
        paymentMode:String,
        cardNumber:String,
        cardName:String,
        expirationDate:String
    },
    orderAmount: String,
    feedbackRating: Number,
    status:{type:String, default: "Placed"},
    date: {type:Date, default:() => Date.now()}
});

module.exports = mongoose.model('Order', orderSchema);
