const mongoose=require('mongoose')


const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String
    },
     profileImg:{
        type:String,   // store image URL
        default:""     // optional default image
    },
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
],
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    ],
},
{
    timestamps:true
})

const userModel=mongoose.model("user",userSchema);

module.exports=userModel;