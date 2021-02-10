require('./models/db');  //import MONGODB connction files

const express = require('express');  //importing express
const path = require('path');//importing path
const bodyparser = require('body-parser');//importing body-parser

const userController = require('./controllers/userController');                      //                
const adminController = require('./controllers/adminController');                    //   
const productController = require('./controllers/productController');                //     importing routing or controller
const categoryController = require('./controllers/categoryController');              //         
const cartController = require('./controllers/cartController');                      // 


require('./helpers/init_redis')  //importing redis


var app = express();                //Asigning express
app.use(bodyparser.urlencoded({
    extended: true                                          //Asigning bodyparser
}));
app.use(bodyparser.json());


app.listen(4000, () => {
    console.log('Express server started at port : 3000');               //adding port on 3000
});

app.use('/user', userController);            //  setting router  
app.use('/admin',adminController);           //  setting router      
app.use('/product',productController);       //  setting router      
app.use('/category',categoryController);     //  setting router      
app.use('/cart',cartController);             //  setting router 