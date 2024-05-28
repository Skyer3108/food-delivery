const userModel=require('../models/userModel')

const jwt=require('jsonwebtoken')

const bcrypt=require('bcrypt')

const validator=require('validator')
const { exists } = require('../models/foodModel')


//login user

const loginUser=async(req,res)=>{

    const {email,password}=req.body

    try{
        const user=await userModel.findOne({email})

        if(!user){
            return res.send({
                status:400,
                sucess:false,
                message:"User doesn't exist"
            })
        }

        const isMatch=await bcrypt.compare(password,user.password)

            if(!isMatch){

                return res.send({
                    sucess:false,
                    message:"Invalid credentials"
                })

            }

            const token=createToken(user._id)

            return res.send({
                message:"user login Sucess",
                sucess:true,
                token
            })

    }
    catch(err){

        return res.send({
            status:400,

            sucess:false,
            message:"Error"

        })

    }

    

}


//user token
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}





//register user
const registerUser=async(req,res)=>{

    const {name,password,email,}=req.body

    try{

        //checking email exists
        const existsemail=await userModel.findOne({email})

        if(existsemail){
            return res.send({
                status:400,
                sucess:false,
                message:'Already email exist'
            })
        }

        //validating email format & strong password

        if(!validator.isEmail(email)){
             return res.send({
                status:400,
                sucess:false,
                message:'Please enter a valid email'
            })
        }

        if(password.length<8){

            return res.send({
                status:400,
                sucess:false,
                message:'Please enter 8 charecters'
            })

        }

        //hashing user password
        const salt=await bcrypt.genSalt(10)

        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

      const user=  await newUser.save()

      const token=createToken(user._id)

      return res.send({
        status:200,
        sucess:true,
        token:token
      })
      




    }
    catch(err){

        return res.send({
            sucess:false,
            message:'Eroor on Registering'
        })

    }

}

module.exports={loginUser,registerUser}