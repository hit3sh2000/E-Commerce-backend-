
const mongoose = require('mongoose');  //importing mongoose
const bcrypt = require('bcrypt')       //importing bcrypt


//userSchema for user
var userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {                                    
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
      },
    products :[
        {type: mongoose.Schema.Types.ObjectId,ref:'Product'}
    ]
});


userSchema.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(this.password, salt)
        this.password= hashPassword
        next()
    }catch(err){
        console.log(err)
    }
})



mongoose.model('User', userSchema); //exporting schema