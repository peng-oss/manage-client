import connectMongoDB from "@/libs/mongodb";
import User, { IUserInfo, RoleCode } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json() as IUserInfo
        const {receiveStatus,phone,sex ,role,_id} = reqBody
        await connectMongoDB()
        //根据id查询并且更新
    
        if (role.value!=='') {
            await User.findByIdAndUpdate(_id,{phone,sex,role,receiveStatus})
        } else {
            await User.findByIdAndUpdate(_id,{phone,sex,receiveStatus})
        }

     
        const response = NextResponse.json({
            message: "修改成功",
            success: true,  
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}

export async function DELETE(request: NextRequest){
    try {
        const reqBody = await request.json() as IUserInfo
        const {_id} = reqBody
        await connectMongoDB()
       //根据id查询并且更新
        await User.findByIdAndDelete(_id)

        // 登录成功
        const response = NextResponse.json({
            message: "删除成功",
            success: true,
            
        })

      

        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}