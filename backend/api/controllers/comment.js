const mongoose = require("mongoose");
const Comment = require("../models/comment");
require("dotenv").config();

exports.comments_get_all = (req, res, next) => {
  Comment.find()
    .populate("user", "name")
    .populate({
      path: "productDetail",
      populate: { path: "product" },
    })
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        comments: docs
      };
      res.status(200).json(response);
    
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};


exports.comments_create_comment = async (req, res, next) => {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.comments_get_comment = (req, res, next) => {
  const id = req.params.productDetailId;
  Comment.find({ productDetail: id })
    .sort({createdAt: -1})
    .populate("user", "name")
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          comment: doc,
         
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.comments_delete = (req, res, next) => {
  const id = req.params.commentId;
 
  Comment.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Comment deleted",
       
      });
    })
 
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
