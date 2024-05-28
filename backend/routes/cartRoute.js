
const express=require('express')

const authMiddleware=require('../middleware/auth')

const {addToCart,removeFromCart,getCart}=require('../controllers/cartContoller')

const carRouter=express.Router()

carRouter.post('/addCart',authMiddleware,addToCart)

carRouter.post('/remove',authMiddleware,removeFromCart)

carRouter.post('/get',authMiddleware,getCart)

module.exports=carRouter