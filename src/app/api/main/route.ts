import connectMongoDB from "@/libs/mongodb";
import Main, { IMain } from "@/models/main";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { introduction, notice, timeDetail } = await request.json()
    await connectMongoDB()
    await Main.create({ introduction, notice, timeDetail })
    return  NextResponse.json({message:"ok" },{status:200})
}


export async function GET() {
    await connectMongoDB()
    const data = await Main.find()
    return NextResponse.json({ data })
}