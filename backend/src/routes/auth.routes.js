const express=require('express')
const authController=require('../controllers/auth.controller')
const router=express.Router()
const multer=require("multer")
const upload=require("../middlewares/upload.middleware")
// user auth api
router.post('/user/register',upload.single("profileImg"),authController.registerUser)
router.post('/user/login',authController.loginUser)
router.get('/user/logout',authController.logoutUser)


module.exports=router