const mongoose = require('mongoose');


//this is for connnecting MongoDB
mongoose.connect('mongodb://localhost:27017/Ecom', { 
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./user');       // requiring Schema     
// require('./admin');      // requiring Schema     
require('./product');    // requiring Schema 
// require('./category');   // requiring Schema     
// require('./cart');       // requiring Schema 