const express = require('express'); //importing express
var router = express.Router();
const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');

router.get('/', async(req, res) => {
    try{
        const admins = await Admin.find()
        res.json(admins)

    }catch(err){
    res.send(err)
}
    
});


router.get('/:id', async(req, res) => {
    try{
        const admin = await Admin.findById(req.params.id)
        res.json(admin)

    }catch(err){
    res.send(err)
}
    
});

router.patch('/:id',async(req, res) =>{
    try{
        const admin = await Admin.findById(req.params.id)
        admin.username = req.body.username
        admin.email = req.body.email
        admin.password =  req.body.password
        const a1 = await admin.save()
        res.json(a1)
    }catch(err){
        res.send(err)
    }
})

router.delete('/:id', async(req, res) =>{
    try{
        const admin = await Admin.findOneAndDelete(req.params.id)
        res.json(admin)

    }catch(err){
        res.send(err)
    }
})

router.post('/', async(req, res) => {
   
   const admin =  new Admin({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
   })
    try{
        const a1 =  await admin.save()
        res.json(a1)

   }catch(err){
       res.send(err)
   }
});






module.exports = router;