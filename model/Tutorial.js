const mongoose = require('mongoose');

const Tutorial = new mongoose.Schema({
    title: String,
    author:String,
    comments:{
        type:[],
        default: Array
    }
})
module.exports = { Tutorial};