const fs=require('fs')
const path = require('path')

const cartPath=path.join(__dirname,'../','data/cart.json')

const addProductToCart=(productId,image,productPrice)=>{

    fs.readFile(cartPath,(err,cartContent)=>{
        //cart details
        let cart={products:[],totalPrice:0};
        if(!err&&cartContent.length){
            cart=JSON.parse(cartContent);
        }
        //if product already exist in cart
        let existingProductIndex=cart.products.findIndex((prod)=>prod.id==productId)
        let updatedProduct;
        if(existingProductIndex!=-1){
              updatedProduct=cart.products[existingProductIndex]
              updatedProduct.quantity+=1;
              cart.products[existingProductIndex]=updatedProduct;
        }else{
            updatedProduct={id:productId,image:image,price:productPrice,quantity:1};
            cart.products=[...cart.products,updatedProduct];
        }
      cart.totalPrice=(+cart.totalPrice)+(+productPrice);
       fs.writeFile(cartPath,JSON.stringify(cart),(err)=>{
        
       })
    })
}


//deleting the product from the cart as well as from file
const deleteProductFromCart=async(productId,req,callback)=>{
     fs.readFile(cartPath,(err,cartContent)=>{
        let cart={};
        if(!err){
         cart=JSON.parse(cartContent);
        }
          //if product already exist in cart
          let existingProductIndex=cart.products.findIndex((prod)=>prod.id==productId)
          let updatedCart;
          if(existingProductIndex!=-1){

            //converting the string price into number
            cart.totalPrice=(+cart.totalPrice)

            //subtracting the deleted cart amout from totalPrice
               const reducedPrice=cart.products[existingProductIndex].quantity*cart.products[existingProductIndex].price
              cart.totalPrice=cart.totalPrice-reducedPrice;
              updatedCart=cart.products.filter((prod)=>prod.id!=productId)
              cart.products=[...updatedCart]
              fs.writeFile(cartPath,JSON.stringify(cart),(err)=>{
                //deletion from the cart page
                  if(req!=undefined){
                    callback();
                  }
              });
          }    
     })
}

//getting the cart item from file
const getProductFromCart=(callBack)=>{
  fs.readFile(cartPath,(err,cartContent)=>{
        let products={};
           if(!err){
            products=JSON.parse(cartContent);
           }
          callBack(products)
  })
}




module.exports={
    addProductToCart,deleteProductFromCart,getProductFromCart
}

