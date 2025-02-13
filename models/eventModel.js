import mongoose from "mongoose";
const eventSchema = new mongoose.Schema(
    {
        userEmail:{
            type: String,
            required: true,
        },
        eventName: {
            type: String,
            required: true,
        },
        eventDescription: {
            type: String,
            default: "",
        },
        eventDate: {
            type: Date,
            required: true,
        },
    }
);

const eventModel = mongoose.model("events", eventSchema);

export default eventModel;
