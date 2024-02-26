import mongoose from "mongoose"

const  connectMongoDB=async()=>{
    try{
        const conn=await mongoose.connect("mongodb+srv://peng-oss:lFE7W3oY5Ou7AQcp@cluster0.khta4l8.mongodb.net/memorialDB"??'')
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

export default connectMongoDB