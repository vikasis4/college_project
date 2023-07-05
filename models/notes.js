import { Schema, model, models } from "mongoose";

const NotesSchema = new Schema({
    SubjectRelationId: { type: "string" },
    notes: [{
        name: { type: "string" },
        link: { type: "string" },
        topics: [{ name: { type: "string" } }]
    }]
})

const Notes = models.Notes || model("Notes", NotesSchema);

export default Notes;