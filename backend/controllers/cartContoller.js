const userModel=require('../models/userModel')


//add to cart
const addToCart=async(req,res)=>{

    try{

        let userData=await userModel.findOne({_id:req.body.userId})

        let cartData=await userData.cartData;
        if(!cartData[req.body.itemId]){

            cartData[req.body.itemId]=1

        }
        else{
            cartData[req.body.itemId]+=1
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData})

        return res.send({
            sucess:true,
            message:'Added to Cart'
        })
    }
    catch(err){

        res.send({
            sucess:false,
            message:err
        })

    }

}


//remove from cart
const removeFromCart=async(req,res)=>{

    try{
        let userData=await userModel.findById(req.body.userId)

        let cartData=await userData.cartData;

        if(cartData[req.body.itemId]>0){

            cartData[req.body.itemId]-=1

        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData})

       return res.send({
            sucess:true,
            message:'Removed from cart'
        })

    }
    catch(err){

       return res.send({
            sucess:false,
            message:err
        })

    }
}


//fetch user cart data
const getCart=async(req,res)=>{

    try{

        let userData=await userModel.findById(req.body.userId)

        let cartData=await userData.cartData

        res.send({
            sucess:true,
            message:"Here is the cartData",
            cartData
        })
    }
    catch(err){

        res.send({
            sucess:false,
            message:err
            
        })

    }

}

module.exports={addToCart,removeFromCart,getCart}


