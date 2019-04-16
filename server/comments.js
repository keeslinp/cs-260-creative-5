const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

const users = require("./users.js");

const User = users.model;

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  photo: {
    type: mongoose.Schema.ObjectId,
    ref: 'Photo'
  },
  content: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Comment = mongoose.model('Comment', commentSchema)


router.post("/", auth.verifyToken, User.verify, async (req, res) => {
  console.log(req.body);
  // check parameters
  if (!req.body.content)
    return res.status(400).send({
      message: "Must include content"
    });

  const comment = new Comment({
    user: req.user,
    content: req.body.content,
    photo: req.body.photoId,
  });
  console.log(comment);
  try {
    await comment.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get('/:photoId', async (req, res) => {
  const photoId = req.params.photoId;
  try {
    let comments = await Comment.find({
      photo: photoId,
    }).sort({
      created: -1
    }).populate('user');
    return res.send(comments);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Comment,
  routes: router,
}
