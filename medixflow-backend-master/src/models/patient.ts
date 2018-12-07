import * as mongoose from "mongoose";
import * as mongooseStringQuery from "mongoose-string-query";
import * as timestamps from "mongoose-timestamp";

const PatientSchema = new mongoose.Schema(
        {
            name: {
                required: true,
                type: String,
            },
            room: {
                required: true,
                type: String,
            },
        },
        { minimize: false },
);

PatientSchema.plugin(timestamps);
PatientSchema.plugin(mongooseStringQuery);

const Patient = mongoose.model("Patient", PatientSchema);
module.exports = Patient;
