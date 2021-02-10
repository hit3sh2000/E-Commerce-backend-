const express = require('express'); //importing express
var router = express.Router();
const mongoose = require('mongoose');
const Cart = mongoose.model('Cart');


//to add product to cart
router.post('/addToCart',async(req,res)=>{
    
    const cart =  new Cart({
        user: req.body.user,
        product: req.body.product,
        quantity:req.body.quantity,
        price:req.body.price

    });

    cart.save((err,cart) =>{
        if(err) return res.status(400).json({ err })
        if(cart){
            return res.status(200).json({ cart })
        }
    })

})



//to get all product from cart
router.get('/', async(req, res) => {
    try{
        const cart = await Cart.find()
        res.json(cart)

    }catch(err){
    res.send(err)
}
    
});
module.exports = router;