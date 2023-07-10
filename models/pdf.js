import { Schema, model, models } from "mongoose";

const PdfSchema = new Schema({
    Name: {type: "string"},
    SubjectRelationId: { type: "string" },
    notes: [{
        link: { type: "string" },
        topics: [{ name: { type: "string" } }],
        author: { type: "string" },
    }],
    pyqs: [{
        link: { type: "string" },
        year: { type: "number" },
        type: { type: "string" },
        author: { type: "string" },
    }]
})

const Pdf = models.Pdf || model("Pdf", PdfSchema);

export default Pdf;