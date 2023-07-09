import { NextResponse } from "next/server";
import { connectToDb } from "@utils/database";
import Account from "@models/account";
import { otpMail } from "@utils/handleEmail";
import { generateOtp } from "@utils/otp";
import { generateToken, verifyToken } from "@utils/jwtToken";

export const POST = async (req, res) => {
    try {

        await connectToDb();
        var { action, otp, email, token } = await req.json();
        var response;

        if (action === 'auth') {
            response = await auth(email);
        }
        else if (action === 'verifyOtp') {
            response = await verifyOtp(email, otp);
        }
        else if (action === 'verifyToken') {
            response = await verifyTkn(token);
        }

        return NextResponse.json(response)

    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: false })
    }
}

////////////////////////////////// FUNCTIONS //////////////////////////////////////
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

            if (account.tokens.length === 10) {
                account.tokens.splice(4, 10)
            }
            var token = await generateToken(account._id.toString());
            account.tokens.push({tkns:token});
            account.save()
            return { status: 'true', token }

        } else {
            return { status: 'galat' }
        }
    } catch (error) {
        console.log(error);
        return { status: 'false' }
    }
}


const verifyTkn = async (token) => {
    var toks = await verifyToken(token);
    if (toks.status) {
        var account = await Account.findById(toks.result);
        if (account) {
            var tokin = account.tokens.filter(({ tkns }) => tkns === token)
            if (tokin.length > 0) {
                return { status: true, account }
            }
        }
        return { status: false }
    }
}