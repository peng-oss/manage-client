import connectMongoDB from "@/libs/mongodb"
import Appraisal, { IAppraisal } from "@/models/appraisal"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const { username,content} = await request.json() as IAppraisal
        await connectMongoDB()
       
       
            await Appraisal.create({ username, content})
        
        return  NextResponse.json({success:true ,message:"ok"},{status:200}) 
    } catch (error) {
        return  NextResponse.json({success:false ,message:"服务器异常"},{status:500}) 
    }
    
}

export async function DELETE(request: Request) {
    try {
        const { _id} = await request.json() as IAppraisal
        await connectMongoDB()
       
       
            await Appraisal.findByIdAndDelete(_id)
        
        return  NextResponse.json({success:true ,message:"删除成功"},{status:200}) 
    } catch (error) {
        return  NextResponse.json({success:false ,message:"服务器异常"},{status:500}) 
    }
    
}

