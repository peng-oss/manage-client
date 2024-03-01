import User from "@/models/user"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import connectMongoDB from "@/libs/mongodb";
interface ILogin{
    username:string
    password:string
}
export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json() as ILogin
        const {username, password} = reqBody
        await connectMongoDB()
       //根据userName进行查询是否注册
        const user = await User.findOne({username})

        if(!user){
            return NextResponse.json({ success:false,message: "当前用户没有注册"}, {status: 400})
        }
        
        //比较密码
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({success:false,message: "密码错误"}, {status: 400})
        }
        
         //创建token
        const tokenData = {
            id: user._id,
            username: user.username,
            password: user.password
        }


        const token = await jwt.sign(tokenData, "secret")

        // 登录成功
        const response = NextResponse.json({
            message: "登录成功",
            success: true,
            data: {
                token,
                username: user.username,
                sex: user.sex,
                role: user.role,
                phone: user.phone,
                receiveStatus: user.receiveStatus,
                _id: user._id
            }
        })

        // 创建一个存token的cookies
        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}