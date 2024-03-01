import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(res:NextRequest,{params}:{params:{id:string}}) {
    try {
        
        const { id } = params
        await connectMongoDB()
        
         //根据userName进行查询是否注册
         const user = await User.findById(id)

         if(!user){
             return NextResponse.json({ success:false,message: "当前用户没有注册"}, {status: 400})
         }
        const response = NextResponse.json(
            {
                data:user,
                success: true,
            }
        )
       

        return response;
        
    } catch (error : any) {
        return NextResponse.json({ error: error.message},
            {status: 500});
    }
    
}