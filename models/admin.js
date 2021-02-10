const mongoose = require('mongoose');


//adminSchema  for admin
var adminSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
});

mongoose.model('Admin', adminSchema);//exporting schema