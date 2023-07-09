import { Schema, model, models } from "mongoose";

const AccountSchema = new Schema({
    email: { type: "string", require: true },
    otp: { type: "number", default: 0 },
    tokens: [{
        tkns: { type: "string" }
    }],
    uploads: [{
        name:{type: "string"},
        relationId: { type: "string" },
    }],
    comments: [{
        comment: { type: "string"},
        relationId: { type: "string" },
    }]
})

const Account = models.Account || model("Account", AccountSchema);

export default Account;