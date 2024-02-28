import connectMongoDB from "@/libs/mongodb"
import User from "@/models/user"
import { NextResponse } from "next/server"
import bcryptjs from "bcryptjs";

 interface ILogin{
    username:string
    password:string
}
export async function POST(request: Request) {
    try {
        const { username, password } = await request.json() as ILogin
   await connectMongoDB()
        const user = await User.findOne({username})


        if(user){
            return NextResponse.json({success:false,message:"已注册"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            password: hashedPassword,
        })

// Saves the new user to the database.
        const savedUser = await newUser.save()


        return NextResponse.json({
            message: "注册成功",
            success: true,
            savedUser
        })
     
      
    } catch (error) {

        return  NextResponse.json({success:false ,message:"服务器异常"},{status:500}) 
    }
    
}

