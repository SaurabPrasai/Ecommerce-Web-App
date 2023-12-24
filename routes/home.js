const router=require('express').Router();
const path=require('path');
const { products } = require('../utils/product');
const { getHome } = require('../controllers/homeController');
const { postCart, getCart } = require('../controllers/cartController');

router.get('/',getHome)

router.post('/cart',postCart)
router.get('/cart',getCart)


module.exports=router;