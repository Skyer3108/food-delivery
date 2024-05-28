const mongoose=require('mongoose')

// const connectDB=async()=>{
//     (await mongoose.connect(process.env.MONGO_URI)).then(()=>{
//         console.log('MONGO_DB CONNECT')
//     })
// }

// module.exports=connectDB
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('MONGODB CONNECTED')


}).catch((err)=>{
    console.log(err)

})