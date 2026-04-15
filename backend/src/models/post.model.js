const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  username:{
    type: String
  },
  image: {
    type: String,
    required: true
  },
  caption: {
    type: String
  },
  placeName: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  comments: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });

const postModel=mongoose.model("Post", postSchema);

module.exports=postModel