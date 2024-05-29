
const orderModel=require('../models/orderModel')

const userModel=require('../models/userModel')

const Stripe=require('stripe')

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)


//Placeing user oder from content
//before this we have to setup the STRIPE in .env file
const placeOrder=async(req,res)=>{

    const frontend_url="http://localhost:5173"

    try{

        const newOrder=new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,

        })

        await newOrder.save()

        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items=req.body.items.map((item)=>({

            price_data:{
                currency:'inr',
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },

            quantity:item.quantity

        }))

        line_items.push({
            price_data:{
                currency:"inr",

                product_data:{
                    name:'Delivery Charges'
                },
                unit_amount:2*100*80
            },
            quantity:1
        })

        const session=await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`


        })

        res.send({
            sucess:true,
            session_url:session.url
        })
        
    }
    catch(err){

        return res.send({
            sucess:false,
            message:'Error'
        })

    }


}


const verifyOrder=async(req,res)=>{

    const {orderId,sucess}=req.body

    try{
        if(sucess=='true'){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            return res.send({
                sucess:true,
                message:'Paid'
            })
        }

        else{

            await orderModel.findByIdAndDelete(orderId)

            return res.send({
            sucess:false,
            message:'Not Paid'
        })


        }



    }

    catch(err){

        return res.send({
            sucess:false,
            message:'Error'

        })

        

    }



}

//user orders for frontend 
const userOrders=async(req,res)=>{

    try{
        const orders=await orderModel.find({userId:req.body.userId})

        res.send({
            sucess:true,
            data:orders
        })

    }

    
    catch(err){

        res.send({
            sucess:false,
            error:err
        })

    }



}

//Listing orders fro admin pannel

const listOrders=async(req,res)=>{

    try{

        const orders=await orderModel.find({})

        res.send({
            sucess:true,
            data:orders
        })

    }
    catch(err){

        res.send({
            sucess:false,
            error:err
        })


    }

}

//API FOR UPDATING THE ORDER STATUS

const updateStatus=async(req,res)=>{

    try{

       await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})

       res.send({
        sucess:true,
        message:'Updated the Status'
       })



    }
    catch(err){

        return res.send({
            sucess:false,
            message:'Problem with upadating the status'
        })

    }

}


module.exports={placeOrder,verifyOrder,userOrders,listOrders,updateStatus}