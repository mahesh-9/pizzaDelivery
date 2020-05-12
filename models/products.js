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
    isDeleted: Boolean,
    productImage:{type:String,required:false}
});

module.exports = mongoose.model('Products', productSchema);
