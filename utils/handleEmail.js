const nodemailer = require('nodemailer');

export const otpMail = async (email, otp) => {
    var mailOptions = {
        from: process.env.email_id,
        to: email,
        subject: 'Nit kkr OTP sent',
        html: `<h1>OTP is ${otp}</h1>`
    }
    return await sendMail(mailOptions);
}

//////////////////////// FUNCTIONS /////////////////////////////////
var transpoter = nodemailer.createTransport({
    secure: true,
    service: 'gmail',
    auth: {
        user: process.env.email_id,
        pass: process.env.email_pass
    },
    port: 2525,
    tls: {
        rejectUnauthorized: false
    }
})

transpoter.verify(function (err, res) {
    if (err) {
        console.log('connection failed');
    }
    else {
        console.log('Email services are Live');
    }
})

const sendMail = async (mailOptions) => {
    var ts = await transpoter.sendMail(mailOptions);
    return ts;
}
