import * as mongoose from "mongoose";
import * as mongooseStringQuery from "mongoose-string-query";
import * as timestamps from "mongoose-timestamp";

const PatientSchema = new mongoose.Schema(
        {
            strength: {
                required: true,
                type: Number,
            },
            patient: {
                required: true,
                type: mongoose.Schema.Types.ObjectId,
            }
        },
        { minimize: false },
);

PatientSchema.plugin(timestamps);
PatientSchema.plugin(mongooseStringQuery);

const Patient = mongoose.model("pain", PatientSchema);
module.exports = Patient;
