const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
    username: String,
    text:String,
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
module.exports = { Comment};
