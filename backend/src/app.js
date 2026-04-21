const express=require('express')
const cookieParser=require('cookie-parser')

const authRoutes=require('./routes/auth.routes')
const postRoutes=require('./routes/post.routes')
const cors=require("cors")

const app=express()
app.use(cors({
     origin:"https://destniye.vercel.app",
    // origin:"http://localhost:5173",
    credentials:true
}))
app.use("/uploads", express.static("uploads"))
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    

app.use('/api/auth',authRoutes)

app.use('/post',postRoutes)


module.exports=app;