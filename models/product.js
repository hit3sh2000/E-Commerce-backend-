const mongoose = require('mongoose');

//productSchema for product

var productSchema = new mongoose.Schema({

    ProductName: {
        type: String,
    }, 
    Price: {
        type: String,
    }, 
    Category: {
        type: String,
    }, 
    SizesAvailable: {
        type: String,
    }, 
    Brand: {
        type: String,
    }, 
    Color: {
        type: String,
    },
    users:{type: mongoose.Schema.Types.ObjectId,ref:'User'}
    
});

mongoose.model('Product', productSchema);//exporting schema