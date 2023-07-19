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
        const id = req.url.split("/blog/")[1];
        const post = await prisma.post.findFirst({where:{id}});
        if(!post){
            return NextResponse.json({message: "Not found"}, {status: 404});
        }
        return NextResponse.json({message: "success", post}, {status: 200});
    }catch(err){
        return NextResponse.json({message: "Error", err}, {status: 500});
    } 
    finally{
        await prisma.$disconnect();
    }
};

export const PUT = async (req: Request, res: NextResponse) => {
    try{
        await main();
        const {title, description} = await req.json()

        const id = req.url.split("/blog/")[1];
        const post  = await prisma.post.update({data:{title, description}, where: {id}});
        return NextResponse.json({message: "success", post}, {status: 200});

    }catch(err){
        return NextResponse.json({message: "Error", err}, {status: 500});
    } 
    finally{
        await prisma.$disconnect();
    }
};

export const DELETE = async (req: Request, res: NextResponse) => {
    try{
        await main();
        const id = req.url.split("/blog/")[1];
        const post  = await prisma.post.delete({where: {id}});
        return NextResponse.json({message: "success", post}, {status: 200});

    }catch(err){
        return NextResponse.json({message: "Error", err}, {status: 500});
    } 
    finally{
        await prisma.$disconnect();
    }
};
