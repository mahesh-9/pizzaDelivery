const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = bcrypt.genSaltSync(10);


const User = require('../models/user');

exports.createAccount = async (req, res) => {
    let user = req.body;
    let {password} = user; 
    try{
        const hash =  bcrypt.hashSync(password, saltRounds);
        console.log('hash',hash)
        user.password = hash.toString();
        console.log(user)
        let userObj = new User(user);
        let result =await userObj.save();
        if(result){
            req.session.user = user._id;
            req.session.save()
        }
        res.json({"message":"request successful","data":result})
    }catch(error){
        res.status(500).send({"error":error});
    }    
}

exports.authenticateUser = async (req,res) => {
    let {username,password } =req.body; 
    try{
        let user = await User.findOne({"email":username})
        if(user){
            console.log(user.password,password)
            if(bcrypt.compareSync(password, user.password)){
                req.session.user = user._id;
                req.session.save()
                console.log('sess-log',req.session)
                res.json({"message":"User authenticated successfully","user":user})
            }else{
                res.status(500).json({"messsage":"Username/Password combination is not correct"})
            }
        }else{
            res.status(404).json({"message":"Username not found!!"})
        }
    }catch(error){
        res.status(500).send(error)
    }    
}

exports.logout = async (req,res) =>{
    console.log('session',req.session)
    if(req.session){
        req.session.destroy( err => {
            if(err)
                res.status(500).json({"message":"Something went wrong.Please try again"})
            console.log('session-lo',req.session)
            res.json({"message":"Logout successful!!!"})
        })
    }
}

exports.getAllUsers = async (req, res) => {
    User.find({}, (err, user) => {
        console.log(user)
        if (err) throw err;
		res.status(200).json(user);
		})
};

exports.getUserProfile= async (req,res) =>{
    let userId = req.params.id;
    console.log("user id ",userId);
    try{
        let user = await User.findById(userId).exec();
        res.json({"message":"request","data":user})
    }catch(error){
        res.status(500).send(error);
    }
}

exports.updateUserProfile = async (req,res) => {
    let userId = req.params.id;
    console.log("request:",userId, req.body);
    try{
        let user = await User.findById(userId);
        user.set(req.body);
        var result = await user.save();
        res.json({"message":"request","data":result});
    }catch(error){
        res.status(500).send(error);
    }    
}


exports.addAddress = async (req,res) => {
    let userId = req.params.id;
    try{
        let user = await User.findById(userId);
        user.address.push(req.body);
        let result = await user.save();
        res.json({"message":"request","data":result});
    }catch(error){
        res.status(500).send(error);
    }
}

exports.updateAddress = async (req,res) => {
    let userId = req.params.id;
    let addressId = req.params.addressId;
    try{
        let user = await User.findOne({"_id":userId});
        let address = user.address.id(addressId);
        // console.log(address)
        if(address)
            address.set(req.body);
        else
            res.status(404).json({"message":"address doesn't exist"})
        // user.address.push(req.body);
        let result = await user.save();
        res.json({"message":"request","data":result});
    }catch(error){
        res.status(500).send(error);
    }
}

exports.deleteAddress = async (req,res) => {
    let userId = req.params.id;
    let addressId = req.params.addressId;
    try{
        let user = await User.findById(userId)
        let address = user.address.id(addressId)
        if(address){
            let result = await address.remove()
            result = await user.save();
            res.json({"message":"","data":result}) 
        }else{
            res.status(404).json({"message":"address doesn't exist"})
        }        
    }catch(error){
        res.status(500).send(error);
    }

}

exports.addPayments = async (req,res) => {
    let userId = req.params.id;
    try{
        let user = await User.findById(userId);
        user.payment.push(req.body);
        let result = await user.save();
        res.json({"message":"Payment details saved","data":result});
    }catch(error){
        res.status(500).send(error);
    }
}

exports.updatePayments = async (req,res) => {
    let userId = req.params.id;
    let paymentId = req.params.paymentId;
    try{
        let user = await User.findOne({"_id":userId});
        let payment = user.payment.id(paymentId);
        // console.log(address)
        if(payment)
            payment.set(req.body);
        else
            res.status(404).json({"message":"payment details doesn't exist"})
        // user.address.push(req.body);
        let result = await user.save();
        res.json({"message":"request","data":result});
    }catch(error){
        res.status(500).send(error);
    }
}

exports.deletePayments = async (req,res) => {
    let userId = req.params.id;
    let paymentId = req.params.paymentId;
    try{
        let user = await User.findById(userId)
        let payment = user.payment.id(paymentId)
        if(payment){
            let result = await payment.remove()
            result = await user.save();
            res.json({"message":"Deleted Successfully","data":result}) 
        }else{
            res.status(404).json({"message":"Payment detail doesn't exist"})
        }        
    }catch(error){
        res.status(500).send(error);
    }

}
