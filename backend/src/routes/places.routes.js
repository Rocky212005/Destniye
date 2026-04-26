const express=require('express')
const router=express.Router()
const placeController=require('../controllers/place.controller')


router.get("/place",placeController)

module.exports=router;