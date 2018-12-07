import * as mongoose from "mongoose";
import * as mongooseStringQuery from "mongoose-string-query";
import * as timestamps from "mongoose-timestamp";

const RequestSchema = new mongoose.Schema(
        {
            guestName: {
                required: true,
                type: String,
            },
            roomNumber: {
                type: Number,
            },
            taskDescription: {
                required: true,
                type: String,
            },
        },
        { minimize: false },
);

RequestSchema.plugin(timestamps);
RequestSchema.plugin(mongooseStringQuery);

const Request = mongoose.model("Request", RequestSchema);
module.exports = Request;
