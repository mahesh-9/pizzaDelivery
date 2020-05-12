const express = require('express');

const { getProducts, createProducts, deleteProducts, getOneProduct, updateProducts } = require('../controllers/products');

const router = express.Router();

const multer = require('multer')

const fileFilter= (req,file,cb) => {
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png' ||  file.mimetype==='image/ppg'){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

const storage= multer.diskStorage({
    destination: function(req,res,cb){
        cb(null,'uploads/')
    },
    filename: function(req,file,cb){
        cb(null,new Date().toISOString().replace(/:/g, '-')+file.originalname);
    }
});

const upload = multer({
    storage:storage,
    limits: {fileSize: 1024*1024*10},
    fileFilter:fileFilter
});

router.get('/products', getProducts);
router.get('/products/:id', getOneProduct);

router.post('/products', upload.single('pic'),createProducts);

router.patch('/products/:id',upload.single('pic'), updateProducts);
router.delete('/products/:id', deleteProducts);



module.exports = router;