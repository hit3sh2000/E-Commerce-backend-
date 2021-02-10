const express = require('express');  //importing express
var router = express.Router();                                                              
const mongoose = require('mongoose');                                          
const User = mongoose.model('User');                                        
const Product = mongoose.model('Product');                                  
const {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken 
    } = require('../helpers/jwt_helper');                                               
const client = require('../helpers/init_redis');          



router.post('/:id',async (req, res) => {
    try {

    console.log(req.params);
    user = req.params;
    id = user.id;
    const { username, email,  password, role } = req.body;
    const user = await User.create({
        username, 
        email,
        password,
        role

    });
    await user.save();
    res.send(user);

  

        
    } catch (error) {
        console.log(error);
        res.send(error)
    }
},)










//find product of user
router.post('/product/:id',async (req,res) =>{
    const id = req.params.id;
    const product = await Product.findById(id).populate('products');

    res.send(product.products);
})

//add user
router.post('/', async(req, res) => {
    const id = req.params.id;
    
    try{
    const user =  new User({
    
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
   })
   const a1 =  await user.save()
     
   const accessToken = await signAccessToken(a1.id)
   const refreshToken  = await signRefreshToken(a1.id)
   res.json({ accessToken, refreshToken, a1})

   }catch(err){
       console.log(err);
       res.send(err)
   }
});

//add user
router.post('/:id', async(req, res) => {
    const id = req.params.id;
    
    try{
    const user =  new User({
    
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    product: id
   })
   const a1 =  await user.save()
   const productById = await Product.findById(id);
   productById.users.push(user)
   productById.save();
   
   const accessToken = await signAccessToken(a1.id)
   const refreshToken  = await signRefreshToken(a1.id)
   res.json({ accessToken, refreshToken, productById})

   }catch(err){
       res.send(err)
   }
});


//to get alll user
router.get('/', async(req, res) => {
    try{
        const users = await User.find()
        res.json(users)

    }catch(err){
        res.send(err)
    }
});
//dashboard page
router.get('/dashboard', verifyAccessToken, async(req,res) =>{
    try{
        const products = await Product.find()
        res.json(products)

    }catch(err){
    res.send(err)
}
})
//to get  user by id
router.get('/:id', async(req, res) => {
    try{
        const user = await User.findById(req.params.id)
        res.json(user)

    }catch(err){
    res.send(err)
}
    
});
//to edit user
router.patch('/:id',async(req, res) =>{
    try{
        const user = await User.findById(req.params.id)
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        user.password =  req.body.password || user.password
        user.role = req.body.role  || user.role
        user.product = req.body.product || user.product
        const a1 = await user.save()
        res.json(a1)
    }catch(err){
        res.send(err)
    }
})
//to delete user
router.delete('/:id', async(req, res) =>{
    try{
        const user = await User.findOneAndDelete(req.params.id)
        res.json(user)

    }catch(err){
        res.send(err)
    }
})
// to genrate refresh token
router.post('/refresh-token', async(req, res) =>{
    try {
        const { refreshToken } = req.body
        if (!refreshToken) res.status(400);
        const userId = await verifyRefreshToken(refreshToken)
  
        const accessToken = await signAccessToken(userId)
        const refToken = await signRefreshToken(userId)
        res.send({ accessToken: accessToken, refreshToken: refToken })
      } catch (error) {
        console.log(error)
      }
})
//to login user
router.post('/login', async(req, res) => {

    try{
    var un = req.body.username
    var pd = req.body.password
    
    
        const user = await User.findOne({
             username : un
        })

        if(user == null){
            return res.status(400).send('cannot find user')
        }
        
        if(await bcrypt.compare(pd, user.password)){

            const accessToken = await signAccessToken(user.id)
            const refreshToken = await signRefreshToken(user.id )
            res.send({ accessToken,refreshToken })

            const products = await Product.find()
            // res.send(products)

        }else{
            res.send("Not allowed")
        }
    }catch(err){
        res.send(err)
    }
})
//logout
router.delete('/logout', async (req, res) => {
    try {
      const { refreshToken } = req.body
      
      if (!refreshToken) res.sendStatus(400)
      const userId = await verifyRefreshToken(refreshToken)
      
      client.DEL(userId, (err, val) => {
        if (err) {
          console.log(err.message)
        }
        console.log(val)
        res.sendStatus(204)
      })
    } catch (error) {
      console.log(error)
    }
})
module.exports = router;