const express = require('express'); //importing express
var router = express.Router();
const mongoose = require('mongoose');
const Product = mongoose.model('Product');


router.post('/:id',async (req, res) => {

    console.log(req.params);
    const id = req.params;
    
    const { ProductName, Price,Category, SizesAvailable, Brand, Color } = req.body;
    const product = await User.create({
        ProductName,
        Price,
        Category,
        SizesAvailable,
        Brand, 
        Color,
        users : id
    });
    await product.save();

    const userById = await User.findById(id);

    userById.products.push(product);
    await userById.save();

    return res.send(userById);
});



// to get all product
router.get('/', async(req, res) => {
    try{
        const products = await Product.find()
        res.json(products)

    }catch(err){
    res.send(err)
}
    
});

//to get product by id
router.get('/:id', async(req, res) => {
    try{
        const product = await Product.findById(req.params.id)
        res.json(product)

    }catch(err){
    res.send(err)
}
    
});

//to change product details
router.patch('/:id',async(req, res) =>{
    try{
        const product = await Product.findById(req.params.id)
        product.ProductName = req.body.ProductName
        product.Price = req.body.Price
        product.Category =  req.body.Category
        product.SizesAvailable =  req.body.SizesAvailable
        product.Brand =  req.body.Brand
        product.Color =  req.body.Color
        
        const a1 = await product.save()
        res.json(a1)
    }catch(err){
        res.send(err)
    }
})


//to delete product
router.delete('/:id', async(req, res) =>{
    try{
        const product = await Product.findOneAndDelete(req.params.id)
        res.json(product)

    }catch(err){
        res.send(err)
    }
})


// to add product
router.post('/', async(req, res) => {
   
   const product =  new Product({
    ProductName: req.body.ProductName,
    Price: req.body.Price,
    Category: req.body.Category,
    SizesAvailable: req.body.SizesAvailable,
    Brand: req.body.Brand,
    Color: req.body.Color
   })
    try{
        const a1 =  await product.save()
        res.json(a1)

   }catch(err){
       res.send(err)
   }
});


module.exports = router;