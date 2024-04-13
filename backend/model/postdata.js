const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: String,
    designation: String,
    location: String,
    salary: Number,
    email: String,
    age: Number,
    address: String
});

const dataModel = mongoose.model('post', schema);
module.exports = dataModel;
