const userModel=require("../models/user.model")

const bcrypt=require('bcryptjs')
const cookieParser=require('cookie-parser')
const jwt=require('jsonwebtoken');
const { model } = require("mongoose");

async function registerUser(req,res){
    const {fullName , email ,password}=req.body;
    const profileImg=req.file ?req.file.filename :null

    const isUserAlradyExist=await userModel.findOne({
        email
    })

    if(isUserAlradyExist){
        return res.status(400).json({
            message:"user alrady exists"
        })
    }

    const hashPassword=await bcrypt.hash(password,10);

    const user=await userModel.create({
        fullName,
        email,
        password:hashPassword,
        profileImg,
        followers: [],       // ✅ FIX
        following: []   
    })
    const token=jwt.sign({
        id:user._id,

    },process.env.JWT_SECRET )

    res.cookie("token",token)
    
    res.status(201).json({
        message:"user ragister successfully",
        user:{
            _id:user._id,
            email:user.email,
            fullName:user.fullName,
            profileImg:user.profileImg,
            followers:user.followers,
            following:user.following
        }
    })


}


async function loginUser(req,res){
    const {email, password,profileImg}=req.body

    const user=await userModel.findOne({
        email
    })

    if(!user){
        return res.status(400).json({
            message:"user email and password invalid"
        })
    }

    const isPasswordValid=await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
         return res.status(400).json({
            message:"user email and password invalid"
        })
    }
     const token=jwt.sign({
        id:user._id,

    },process.env.JWT_SECRET,
        {expiresIn:"7d"} )
    
    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        maxAge:7*24*60*60*1000

    })

    res.status(201).json({
        message:"user login  successfully",
        user:{
            _id:user._id,
            email:user.email,
            fullName:user.fullName,
            profileImg:user.profileImg,
            followers:user.followers,
            following:user.following
        }
    })

}
function logoutUser(req,res){
    res.clearCookie("token");

    res.status(200).json({
        message:"logout succesfully"
    })
}


async function followUser(req,res){
    console.log("USER:", req.user);
    try{
        const currentUserId=req.user._id
        const targetUserId=req.params.id


    if (currentUserId.toString() === targetUserId) {
      return res.status(400).json({ message: "You can't follow yourself" });
    }
     const currentUser=await userModel.findById(currentUserId)
     const targetUser=await userModel.findById(targetUserId)

     const isFollowing=currentUser.following.includes(targetUserId);

     if(isFollowing){
        currentUser.following.pull(targetUserId)
        targetUser.following.pull(currentUser)

     }else{
        currentUser.following.push(targetUserId)
        targetUser.following.push(currentUserId)
     }

     await currentUser.save()
     await targetUser.save()

      res.json({
      message: isFollowing ? "Unfollowed" : "Followed"
    });

    }catch(err){
        console.log(err);
    res.status(500).json({ message: "Error" });
    }
}
module.exports={registerUser , loginUser,logoutUser,followUser}
