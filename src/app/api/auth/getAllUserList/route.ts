import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(res:NextRequest) {
    try {
        
        await connectMongoDB()
        
        const data = await User.find()

       
        const response = NextResponse.json(
            {
                data,
                success: true,
            }
        )
       

        return response;
        
    } catch (error : any) {
        return NextResponse.json({ error: error.message},
            {status: 500});
    }
    
}