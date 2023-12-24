const express=require('express')
const app=express();
const port=3000;
const path=require('path');
const adminRouter = require('./routes/admin');
const homeRouter = require('./routes/home');

//view engine
app.set('view engine','ejs');

//middleware
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))
app.use('/products',adminRouter)
app.use(homeRouter) 

app.use((req,res,next)=>{
    const viewsData={
        title:'Page not found'
    }
    res.status(400).render('404',viewsData)
})



app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})