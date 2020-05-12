const mongoose = require('mongoose');
//const uri = 'localhost:27017/vidzy';

// const upload = require("./upload");

const multer = require('multer')
const upload = multer({
    dest:'uploads/'
});


const Products = require('../models/products');



mongoose.set('useFindAndModify', false);


exports.getProducts = async (req, res) => {
    Products.find({ isDeleted: false }, (err, prod) => {
        console.log(prod)
        if (err) throw err;
		res.status(200).json(prod);
		})
};

exports.getOneProduct = async(req, res) => {
    Products.find({ _id: req.params.id }, (err, prod) => {
        if (err) throw err;
        res.status(200).json(prod);
})
};

exports.createProducts = async (req, res) => {
    var product = new Products(req.body);
    product.save(function (err, product) {
        if (err) throw err;
        res.status(201).json(product)
    })
    
};   

exports.updateProducts = (req, res) => {
    
    let updateObj = {
        productName: req.body.productName,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        // size: req.body.size,
        // crust: req.body.crust,
        // toppings: req.body.toppings,
	    isDeleted: false
    }
    if(req.file){
        updateObj={
            ...updateObj,
            productImage : req.file.path
        } 
    }
    console.log('uf',updateObj)

    Products.findByIdAndUpdate(req.params.id, updateObj, (err, updated) => {
        if (err) throw err;
        res.status(200).json({
            message: "Product updated successfully"
        })
    })
};

exports.deleteProducts =async (req, res) => {
    Products.findByIdAndUpdate(req.params.id, { isDeleted: true }, (err, updated) => {
        if (err) throw err;
        res.status(200).json({
            message: "Product deleted successfully"
        })
    })
};
