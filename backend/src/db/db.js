const mongoose=require('mongoose')


function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("mongodb connected")
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports =connectDB