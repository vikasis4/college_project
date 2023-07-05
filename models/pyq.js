import { Schema, model, models } from "mongoose";

const PyqSchema = new Schema({
    SubjectRelationId: { type: "string" },
    pyqs: [{
        name: { type: "string" },
        link: { type: "string" },
        year: { type: "number" },
        type: { type: "string" }
    }]
})

const Pyq = models.Pyq || model("Pyq", PyqSchema);

export default Pyq;