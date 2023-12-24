const { getAllProducts } = require("../models/product")

const getHome=async(req,res)=>{
    const productsData=await getAllProducts()
    const viewsData={
        admin:false,
        title:'Home Page',
        products:productsData
     }
      res.status(200).render('product-list',viewsData)
}

module.exports={
    getHome
}

