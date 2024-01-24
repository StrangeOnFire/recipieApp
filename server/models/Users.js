import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, require: true, unique: true , trim: true},
    password: { type: String, require: true },
    savedRecipies : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "recipies",
    }]
})

export const Usermodel = mongoose.model("users", UserSchema)