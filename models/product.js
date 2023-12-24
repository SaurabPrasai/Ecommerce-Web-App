const fs=require('fs');
const path = require('path');
const { deleteProductFromCart } = require('./cart');


const saveProducts=async(product)=>{
const productsPath=path.join(__dirname,'../','data/product.json')
fs.readFile(productsPath,(err,productsData)=>{
    let products=[];
    if(!err && productsData.length){
        products=JSON.parse(productsData)
    }
    //checking if the product alerdy exist or not and if exist the updating with new value
    let existingProductIndex=products.findIndex((prod)=>prod.productId==product.productId)
    if(existingProductIndex!=-1){
        products[existingProductIndex]=product;
    }else{
     products.push(product);
    }
    fs.writeFile(productsPath,JSON.stringify(products),(err)=>{
        console.log(err);
    })
})

}

const getAllProducts=async()=>{
const productsPath=path.join(__dirname,'../','data/product.json')
return new Promise((resolve, reject) => {
    fs.readFile(productsPath,(err,data)=>{
      if(err){
        reject(err);
      }
      //checking if the product.json is empty or not
      if(data.length){
        const productsData=JSON.parse(data);
        resolve(productsData)
      }
      return [];
      })
})

}

const getProductById=(productId,callBack)=>{
const productsPath=path.join(__dirname,'../','data/product.json')
fs.readFile(productsPath,(err,data)=>{
    let productData=[];
    if(!err){
     productData=JSON.parse(data);
    }
    productData.map((product)=>{
        if(product.productId==productId){
            callBack(product)
        }
    })
})
}

//delete products
const deleteProductFromFile=async(productId)=>{
const productsPath=path.join(__dirname,'../','data/product.json')
fs.readFile(productsPath,(err,data)=>{
    let productData=[];
    if(!err){
     productData=JSON.parse(data);
    }
    //calling deleteProductFromCart
   deleteProductFromCart(productId)
   const products=productData.filter((product)=>product.productId!=productId);
   fs.writeFile(productsPath,JSON.stringify(products),(err)=>{
    // console.log(err);
   })
})

}

module.exports={
    getAllProducts,saveProducts,getProductById,deleteProductFromFile
}