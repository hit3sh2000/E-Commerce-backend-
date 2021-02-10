'use strict'
const mongoose = require('mongoose');

//cartSchema for cart


var cartSchema = new mongoose.Schema({
    user:{ type: String},
    product:{ type:String},
    quantity:{ type:Number,default:1},
    price:{ type: Number,require:true}
       
    



},{ timestamps: true});

mongoose.model('Cart', cartSchema);//exporting schema