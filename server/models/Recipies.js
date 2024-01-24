import mongoose from "mongoose";

const RecipiesSchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  ingredients: [{ type: String, require: true }],
  instructions: [{ type: String, require: true }],
  imageUrl: { type: String, require: true },
  cookingTime: { type: Number, require: true },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
});

export const Recipiesmodel = mongoose.model("recipies", RecipiesSchema);
