const express=require('express')
const authController=require('../controllers/auth.controller')
const router=express.Router()
const multer=require("multer")
const upload=require("../middlewares/upload.middleware")
const authMiddleware=require("../middlewares/auth.middleware")
// user auth api
router.post('/user/register',upload.single("profileImg"),authController.registerUser)
router.post('/user/login',authController.loginUser)
router.get('/user/logout',authController.logoutUser)

router.post("/user/follow/:id",authMiddleware,authController.followUser)
 
module.exports=router