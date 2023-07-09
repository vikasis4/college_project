import { NextResponse } from "next/server";
import { connectToDb } from "@utils/database";
import Account from "@models/account";
import { otpMail } from "@utils/handleEmail";
import { generateOtp } from "@utils/otp";

export const POST = async (req, res) => {
    try {

        await connectToDb();
        var { action, otp, email } = await req.json();
        var response;

        if (action === 'auth') {
            response = await auth(email);
        }
        else if (action === 'verifyOtp') {
            response = await verifyOtp(email, otp);
        }

        return NextResponse.json(response)

    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: false })
    }
}

const auth = async (email) => {

    try {
        var account = await Account.findOne({ email });
        var otp = generateOtp();
        if (!account) {
            var acc = await Account.create({ email: email });
            acc.otp = otp;
            acc.save();
        } else {
            account.otp = otp;
            account.save();
        }
        var response = await otpMail(email, otp);
        if (response.accepted.length > 0) {
            return { status: true, otp }
        }
        return { status: false }
    } catch (error) {
        console.log(error);
        return { status: false }
    }

}


const verifyOtp = async (email, otp) => {

    try {
        var account = await Account.findOne({ email });
        if (account.otp.toString() === otp.toString()) {
            return { status: 'true' }
        }else{
            return { status: 'galat' }
        }
    } catch (error) {
        console.log(error);
        return { status: 'false' }
    }
}
