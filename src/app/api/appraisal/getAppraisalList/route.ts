import connectMongoDB from "@/libs/mongodb"
import Appraisal from "@/models/appraisal"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    try {
        await connectMongoDB()
        const data = await Appraisal.find()
        return NextResponse.json({ data:data.reverse(),success:true,  },{status:200})
    } catch (error) {
        return  NextResponse.json({success:false ,message:"服务器异常"},{status:500}) 
    }
    
}
