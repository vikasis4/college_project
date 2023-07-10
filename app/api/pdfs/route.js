import { NextResponse } from "next/server";
import { connectToDb } from "@utils/database";
import { headers } from "next/headers";
import Pdf from "@models/pdf";

export const POST = async (req, res) => {
    try {

        await connectToDb();
        var { id, author, year, link, type, PaperType } = await req.json();
        var response;

        if (type === 'notes') {
            response = await handle_notes(id, author, link);
        }
        else if (type === 'pyq') {
            response = await handle_pyq(id, PaperType, year, author, link);
        }

        return NextResponse.json(response)

    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: false })
    }
}

export const GET = async (req, res) => {

    try {
        const headersList = headers();
        const id = headersList.get("cooked");
        const name = headersList.get("named");
        var pdf = await Pdf.findOne({ SubjectRelationId: id })
        if (pdf) {
            return { status: true, pdf }
        } else {
            var newPdf = await Pdf.create({ Name: name, SubjectRelationId: id })
            return { status: true, pdf: newPdf }
        }
    } catch (error) {
        console.log(error);
        return { status: false }
    }
}

///////////////////////// FUNCTIONS ///////////////////////

const handle_pyq = async (id, PaperType, year, author, link) => {

    try {
        var tysm = year ? year : 0;

        var pdf = await Pdf.findOne({ SubjectRelationId: id });
        pdf.pyqs.push({
            link,
            year: tysm,
            author,
            type: PaperType
        })
        await pdf.save();
        return { status: true }

    } catch (error) {
        console.log(error);
        return { status: false }
    }
}