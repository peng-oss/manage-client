import connectMongoDB from "@/libs/mongodb"
import Reserve, { IReserve } from "@/models/reserve"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const { userName, dateString} = await request.json() as IReserve
        await connectMongoDB()
       
       
            await Reserve.create({ userName, dateString})
        
        return  NextResponse.json({success:true ,message:"ok"},{status:200}) 
    } catch (error) {
        return  NextResponse.json({success:false ,message:"服务器异常"},{status:500}) 
    }
    
}
