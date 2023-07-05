import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { connectToDb } from "@utils/database";
import Branch from "@models/branch";

export const POST = async (req, res) => {
    try {
        await connectToDb();
        var { name, subjects } = await req.json();
        var branch = new Branch({
            name,
            subjects
        })
        await branch.save();
        return NextResponse.json({ status: true })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: false })
    }
}
export const GET = async (req, res) => {
    try {
        await connectToDb();
        var data = await Branch.find({});
        return NextResponse.json({ status: true, data })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: false })
    }
}
export const PUT = async (req, res) => {
    try {
        await connectToDb();
        var { name } = await req.json();
        return NextResponse.json({ status: true, name, type:"put"  })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: false })
    }
}
export const DELETE = async (req, res) => {
    try {
        await connectToDb();
        const headersList = headers();
        const name = headersList.get("name");
        await Branch.findOneAndDelete({name})

        return NextResponse.json({ status: true })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: false })
    }
}