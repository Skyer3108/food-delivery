const express=require('express')
const cors=require('cors')

require('dotenv').config()

const db=require('./config/db')
const foodRouter = require('./routes/foodRoute')
const userRouter = require('./routes/userRoute')
const cartRouter=require('./routes/cartRoute')
const orderRouter = require('./routes/orderRoute')

const app=express()

const PORT=5000

//middleware
app.use(express.json())
app.use(cors())

//api endpoint

app.use('/food',foodRouter)
//to get images
app.use('/images',express.static('uplodes'))

app.use('/api/user',userRouter)

app.use('/api/cart',cartRouter)

app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("API WORKING")
})



app.listen(PORT,()=>{
    console.log('Hello')
})