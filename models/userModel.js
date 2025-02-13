import mongoose from "mongoose";
import argon2 from "argon2";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30
        },
        lastName: {
            type: String,
            minlength: 3,
            maxlength: 30
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minlength: 3,
            // match: [/.+@.+\..+/, "Please enter a valid email address"],
        },
        password: {
            type: String,
            required: true,
            minlength: 3,
        },
        contact: {
            type: String,
            required: true,
            // match: /^[0-9]{10}$/,
        },
        color: {
            type: String,
            required: true,
        },
        dob: {
            type: Date,
            required: true,
        },
        gender: {
            type: String,
            required: true,
            enum: ['Male', 'Female', 'Other'],
        },
    },
    { timestamps: true }
);

// Argon2 - Hash the password
UserSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
        try {
            this.password = await argon2.hash(this.password);
        } catch (error) {
            return next(error);
        }
    }
    next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (password) {
    try {
        return await argon2.verify(this.password, password);
    } catch (error) {
        throw new Error("Password verification failed");
    }
};

const userModel = mongoose.model("users", UserSchema);

export default userModel;
