import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    try{
        await prisma.$connect();
        console.log("connected")
    }catch(err){
        console.log("Database connection unsuccessful!!!")
        return Error("Database connection unsuccessful!!!")
    }
}

export const GET = async (req: Request, res: NextResponse) => {
    try{
        await main();
        const posts = await prisma.post.findMany();
        return NextResponse.json({message: "success", posts}, {status: 200});
    }catch(err){
        return NextResponse.json({message: "Error", err}, {status: 500});
    } 
    finally{
        await prisma.$disconnect();
    }
};

export const POST = async (req: Request, res: NextResponse) => {
    const {title, description} = await req.json()
    try{
        await main();
        const post  = await prisma.post.create({data:{title, description}});
        return NextResponse.json({message: "success", post}, {status: 201});
    }catch(err){
        return NextResponse.json({message: "Error", err}, {status: 500});
    } 
    finally{
        await prisma.$disconnect();
    }
};