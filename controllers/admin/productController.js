const { saveProducts, getAllProducts, getProductById, deleteProductFromFile } = require("../../models/product")



const getAddProduct=async(req,res)=>{
    const viewsData={
        admin:false,
        title:'Add Product'
     }
  res.status(200).render('addproduct',viewsData)

}

//saving new product
const postAddProduct=async(req,res)=>{
    const product={
        productId:req.body.productId,
        title:req.body.title,
        image:req.body.image,
        price:req.body.price,
        description:req.body.description
      }
      saveProducts(product)
      res.redirect('/')
}

//admin page
const getAdminPage=async(req,res)=>{
    const productsData=await getAllProducts();
    const viewsData={
        admin:true,
        title:'Home Page',
        products:productsData
     }
      res.status(200).render('product-list',viewsData)
    
}

//editing product
const updateProduct=async(req,res)=>{
    const productId=req.body.productId;
     getProductById(productId,(product)=>{
        const viewsData={
            admin:true,
            title:"Add Product",
            product:product
        }
        res.status(300).render('addproduct',viewsData);
     });
}


//detele product
const deleteProduct=async(req,res)=>{
    const productId=req.body.productId;
       deleteProductFromFile(productId);
       res.redirect('/');
}




module.exports={
    getAddProduct,
    postAddProduct,
    getAdminPage,
    updateProduct,
    deleteProduct
}