const foodModel=require('../models/foodModel')


const fs=require('fs')

//add food item

const addFood=async(req,res)=>{



   

    let image_filename=`${req.file.filename}`;

    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })

    console.log(food)

    try{

        await food.save()


       return res.send({
            sucess:true,
            status:200,
            message:'Food Added Sucessfully'

        })

    }catch(err){

        console.log(err)

      return  res.send({
            sucess:false,
            status:400,
            message:"Error"
        })

    }

}

//all food list

const listFood=async(req,res)=>{
          
    try{
        const foods=await foodModel.find({})

        console.log(foods)

        return res.send({
            sucess:true,
            status:200,
            message:'Food list',
            data:foods,


        })

    }
    catch(err){

        console.log('err',err)
        return res.send({
            status:400,
            message:'Error',
            sucess:false
        })
    }


}

//remove food

const removeFood=async(req,res)=>{

    try{
      const food=await foodModel.findById(req.body.id);
      fs.unlink(`uplodes/${food.image}`,()=>{})
      await foodModel.findByIdAndDelete(req.body.id)

      return res.send({
        sucess:true,
        status:200,
        message:'food removed'
      })


    }
    catch(err){

        return res.send({
            sucess:false,
            message:'Error'
        })

    }
}



module.exports={addFood,listFood,removeFood}