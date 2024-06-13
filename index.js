const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
var port = 8000;
const tutSchema = require('./model/Tutorial');
const comSchema = require('./model/Comment');
const Tutorial = mongoose.model('Tutorial', tutSchema.Tutorial);
const Comment = mongoose.model('Comment', comSchema.Comment);
app.use(bodyParser.json());
app.listen(port, () => {
    console.log('server is up and running');
});
mongoose.connect('mongodb://localhost:27017/LecturesDB').then(() => {
    console.log('Database is up and running');
});
app.post('/tut/save', async (req, res) => {
    const post = new Tutorial({
        title: req.body.title,
        author: req.body.author,
    });

    try {
        const savePost = await post.save();
        res.json(savePost);
    } catch (err) {
        res.json({ message: err.message });
    }
});
app.put('/comments/:id', async (req, res) => {
    const comments = new Comment({
        username: req.body.username,
        text: req.body.text,
    });

    try {
        const savedComment = await comments.save();
        console.log('comments saved in DB');  
        const flag = await Tutorial.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { comments: savedComment } },
            { new: true }
            );
            if (!flag) {
                return res.status(400).json({
                    error: 'Unable to save',
                });
            }  
        res.json({ message: 'Saved the comments inside the tutorial'});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});