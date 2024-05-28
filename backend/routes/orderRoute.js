const express=require('express')

const AuthMiddleware=require('../middleware/auth')

const {placeOrder,verifyOrder, userOrders, listOrders, updateStatus}=require('../controllers/orderContoller')
const authMiddleware = require('../middleware/auth')

const orderRouter=express.Router()

orderRouter.post('/placeorder',AuthMiddleware,placeOrder)

orderRouter.post('/verify',verifyOrder)

orderRouter.post('/userorders',authMiddleware,userOrders)

orderRouter.get('/listorder',listOrders)

orderRouter.post('/updatestatus',updateStatus)

module.exports=orderRouter