const mongoose = require('mongoose');


//categorySchema for category

var categorySchema = new mongoose.Schema({
    name:{
        type: String,
        trim:true,
        required:true
    },
    slug:{
        type: String,
        unique:true,
        required:true
    },
    parentId:{
        type:String
    }
},{ timestamps: true});

mongoose.model('Category', categorySchema);//exporting schema