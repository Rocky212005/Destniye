const express=require('express')
const postController=require('../controllers/post.controller')
const multer=require('multer')
const router=express.Router()
const authMiddleware=require("../middlewares/auth.middleware")

const upload=multer({storage:multer.memoryStorage()})

router.post('/create-post',authMiddleware,upload.single("image"),postController.createPost)
router.get('/feed',postController.getPost)
router.post('/feed/:id',authMiddleware,postController.likePost)


module.exports=router