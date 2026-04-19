const postModel=require("../models/post.model")

const uploadFile=require('../services/storage.service')


async function createPost(req, res) {
  try {
    const result = await uploadFile(req.file.buffer);

    const post = await postModel.create({
      // username:req.body.username,
      userId: req.user._id,
      image: result.url,
      caption: req.body.caption,
      location: req.body.location,
      placeName: req.body.placeName,
    });
    console.log(req.user);

    return res.status(201).json({
      message: "post created successfully",
      post
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error creating post",
      error: error.message
    });
  }
}
async function getPost(req,res) {
    
    const posts=await postModel.find().populate("userId", "fullName profileImg followers").sort({ createdAt: -1 })

    return res.status(200).json({
        message:"post facted succesfully",
        posts
    })
    
}

async function likePost(req,res){
  const userId=req.user._id
  const post=await postModel.findById(req.params.id)

   if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
  const isLiked=post.likes.includes(userId)

  if(isLiked){
    post.likes.pull(userId)
  }else{
    post.likes.push(userId)
  }
  await post.save();

  res.json({
    message: isLiked ? "unliked" : "liked",
    likes: post.likes
  })
}

module.exports={createPost,getPost,likePost}

