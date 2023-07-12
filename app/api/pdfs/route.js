import { NextResponse } from "next/server";
import { connectToDb } from "@utils/database";
import { headers } from "next/headers";
import Pdf from "@models/pdf";
import Account from "@models/account";

export const POST = async (req, res) => {
    try {

        await connectToDb();
        var { userId, id, author, year, link, type, PaperType, topics, refrence, noteId } = await req.json();
        var response;

        if (type === 'NOTES') {
            response = await handle_notes(userId, id, author, link, topics, refrence);
        }
        else if (type === 'PYQ') {
            response = await handle_pyq(userId, id, PaperType, year, author, link, refrence);
        }
        else if (type === 'DELETE') {
            response = await delete_pdf(userId, id, PaperType, noteId);
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

const handle_pyq = async (userId, id, PaperType, year, author, link, refrence) => {

    try {
        var tysm = year ? year : 0;

        var pdf = await Pdf.findOne({ SubjectRelationId: id });
        pdf.pyqs.push({
            link,
            year: tysm,
            author,
            type: PaperType,
            refrence
        })
        await pdf.save();

        var poped = pdf.pyqs.pop();
        var account = await Account.findById(userId);
        account.uploads.push({ name: 'WAP', relationId: poped._id });
        await account.save();

        return { status: true }

    } catch (error) {
        console.log(error);
        return { status: false }
    }
}

const handle_notes = async (userId, id, author, link, topics, refrence) => {
    try {
        var pdf = await Pdf.findOne({ SubjectRelationId: id });
        var tysm = topics.length === 0 ? [{ name: 'Not Mentioned' }] : topics
        pdf.notes.push({
            link,
            topics: tysm,
            author,
            refrence
        })
        await pdf.save();

        var poped = pdf.notes.pop();
        var account = await Account.findById(userId);
        account.uploads.push({ name: 'WAP', relationId: poped._id });
        await account.save();

        return { status: true }
    } catch (error) {
        console.log(error);
        return { status: false }
    }
}

const delete_pdf = async (userId, id, PaperType, noteId) => {
    try {
        var pdf = await Pdf.findOne({ SubjectRelationId: id });
        var account = await Account.findById(userId);

        console.log(pdf);
        if (PaperType === 'pyqs') {
            var index = pdf.pyqs.findIndex(i => i._id.toString() === noteId);
            console.log(index);
            if (index !== -1) {
                pdf.pyqs.splice(index, 1);
            }
        } else {
            var indesx = pdf.notes.findIndex(i => i._id.toString() === noteId);
            if (indesx !== -1) {
                pdf.notes.splice(indesx, 1);
            }
        }

        await pdf.save();

        var idx = account.uploads.findIndex(i => i.relationId === noteId);
        if (idx !== -1) {
            account.uploads.splice(idx, 1);
        }
        await account.save();

        return { status: true }

    } catch (error) {
        console.log(error);
        return { status: false }
    }
}