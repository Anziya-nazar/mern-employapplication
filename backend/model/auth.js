const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name:String,
    email:String,
    username:String,
    password:String
});

const authModel = mongoose.model('user',schema);
module.exports = authModel;