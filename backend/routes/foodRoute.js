const express=require('express')
// const mongoose=require('mongoose')
// const fs=require('fs')


//multer is used to store image storage system

const multer=require('multer');
const {addFood, removeFood, listFood} = require('../controllers/foodContoller');
//const listFood=require('../controllers/foodContoller')

const foodRouter=express.Router();

const foodModel=require('../models/foodModel')

//image storage Engine
const storage=multer.diskStorage({
    destination:"uplodes",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload=multer({storage:storage})
console.log(upload)

foodRouter.post('/add',upload.single('image'),addFood)

foodRouter.get('/list',listFood)

//remove foode item
foodRouter.post('/remove',removeFood)



module.exports=foodRouter
