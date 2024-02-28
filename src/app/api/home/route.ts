import connectMongoDB from "@/libs/mongodb";
import Home, {
    IHome
} from "@/models/home";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { introduction, notice, timeDetail, phone } = await request.json() as IHome
        await connectMongoDB()
        const data = await Home.find()
        if (data.length === 0) {
            await Home.create({ introduction, notice, timeDetail ,phone})
        } else {
            await Home.updateOne({ introduction, notice, timeDetail,phone })
        }
        return  NextResponse.json({success:true ,message:"ok"},{status:200}) 
    } catch (error) {
        return  NextResponse.json({success:false ,message:"服务器异常"},{status:500}) 
    }
    
}


export async function GET() {
    try {
        await connectMongoDB()
        const data = await Home.find()
        return NextResponse.json({ data:data[0],success:true,  },{status:200})
    } catch (error) {
        return  NextResponse.json({success:false ,message:"服务器异常"},{status:500}) 
    }
   
}