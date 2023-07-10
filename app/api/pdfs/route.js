import { NextResponse } from "next/server";
import { connectToDb } from "@utils/database";
import { headers } from "next/headers";
import Pdf from "@models/pdf";

export const POST = async (req, res) => {
    try {

        await connectToDb();
        var { id, notes, type, pyq } = await req.json();
        var response;

        if (type === 'notes') {
            response = await handle_notes(id, notes);
        }
        else if (type === 'pyqs') {
            response = await handle_pyq(id, pyq);
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
            return NextResponse.json({ status: true, pdf })
        } else {
            var newPdf = await Pdf.create({ Name: name, SubjectRelationId: id })
            return NextResponse.json({ status: true, pdf: newPdf })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: false })
    }
}

///////////////////////// FUNCTIONS ///////////////////////

const handle_notes = async (id, notes) => {

}