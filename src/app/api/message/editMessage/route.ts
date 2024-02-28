import connectMongoDB from "@/libs/mongodb"
import Message, { IMessage } from "@/models/message"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const { userName,content} = await request.json() as IMessage
        await connectMongoDB()
       
       
            await Message.create({ userName, content})
        
        return  NextResponse.json({success:true ,message:"ok"},{status:200}) 
    } catch (error) {
        return  NextResponse.json({success:false ,message:"服务器异常"},{status:500}) 
    }
    
}
