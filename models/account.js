import { Schema, model, models } from "mongoose";

const AccountSchema = new Schema({
    email: { type: "string", require: true },
    otp: { type: "number", default: 0 },
    tokens: [{
        tkns: { type: "string" }
    }],
    uploads: [{
        relationId: { type: "string" },
    }],
    comments: [{
        relationId: { type: "string" },
    }]
})

const Account = models.Account || model("Account", AccountSchema);

export default Account;