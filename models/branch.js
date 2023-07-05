import { Schema, model, models } from "mongoose";

const BranchSchema = new Schema({
    name: { type: "string" },
    subjects: [{
        name: { type: "string" }
    }]
})

const Branch = models.Branch || model("Branch", BranchSchema);

export default Branch;