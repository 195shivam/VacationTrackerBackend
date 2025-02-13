import mongoose from "mongoose";
const LeaveSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            minlength: 3,
            // match: [/.+@.+\..+/, "Please enter a valid email address"],
        },
        color: {
            type: String,
            required: true,
        },
        fromDate: {
            type: Date,
            required: true,
        },
        toDate: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

const leaveModel = mongoose.model("leaves", LeaveSchema);

export default leaveModel;
