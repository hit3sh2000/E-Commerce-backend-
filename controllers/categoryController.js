const express = require('express'); //importing express
var router = express.Router();
const mongoose = require('mongoose');
const slugify = require('slugify');
const Category = mongoose.model('Category');

// to create Category
router.post('/create', async(req,res) =>{

    const categoryObj = {
        name:req.body.name,
        slug: slugify(req.body.name)
    }

    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }

    const cat = new Category(categoryObj);
    cat.save((err,category) => {
        if(err) return res.status(400).json({ err });
        if(category){
            
            return res.status(201).json({ category });
        }
    })

});


// to get Category
router.get('/getCategory',  async(req,res) =>{
    Category.find({})
    .exec((err,categories) =>{
        if(err) return res.status(400).json({ err });

        if(categories){
            res.status(200).json({ categories });
        }
    })
})




module.exports = router;