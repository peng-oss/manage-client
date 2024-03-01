import connectMongoDB from "@/libs/mongodb"
import Reserve from "@/models/reserve"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    try {
      
        await connectMongoDB()
       
       
         const data=   await Reserve.find()
        
        return  NextResponse.json({data, success:true ,message:"ok"},{status:200}) 
    } catch (error) {
        return  NextResponse.json({success:false ,message:"服务器异常"},{status:500}) 
    }
    
}
