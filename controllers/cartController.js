const { addProductToCart, getProductFromCart, deleteProductFromCart } = require("../models/cart");
const { getProductById } = require("../models/product");


const postCart=async(req,res)=>{
const productId=req.body.productId;
getProductById(productId,(product)=>{
    addProductToCart(productId,product.image,product.price)
    res.redirect('/');
})
}


const getCart=(req,res)=>{
    getProductFromCart((products)=>{
        const viewsData={
            title:'Cart',
            products
        }
    res.status(200).render('cart',viewsData)


    })
}

const deleteFromCart=(req,res)=>{
    const productId=req.body.productId;
    deleteProductFromCart(productId,req,()=>{
        res.status(300).redirect('/cart')
    })
   
}

module.exports={
    getCart,postCart,deleteFromCart
}