const router=require('express').Router();

const { getAddProduct, postAddProduct, getAdminPage, updateProduct, deleteProduct } = require('../controllers/admin/productController');
const { deleteFromCart } = require('../controllers/cartController');


router.get('/add',getAddProduct)

router.post('/add',postAddProduct)

router.get('/admin',getAdminPage)

router.post('/update',updateProduct)

//delete the entire product from database
router.post('/delete',deleteProduct)

//delete from cart only
router.post('/delete/cart',deleteFromCart)


module.exports=router;