import { Recipiesmodel } from "../models/Recipies.js";
import express from "express";
import { Usermodel } from "../models/Users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await Recipiesmodel.find();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.post("/", async (req, res) => {
  const recipie = new Recipiesmodel(req.body);
  try {
    const response = await recipie.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});



router.put("/", async (req, res) => {
  const recipie = await Recipiesmodel.findById(req.body.recipieID);
  const user = await Usermodel.findById(req.body.userID);
  try {
    user.savedRecipies.push(recipie);
    await user.save();
    res.status(201).json({ savedRecipies: user.savedRecipies });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/savedRecipies/:userID", async (req, res) => {
  try {
    const user = await Usermodel.findById(req.params.userID);
    res.json({ savedRecipies: user?.savedRecipies });
  } catch (err) {
    res.json(err);
  }
});

router.get("/saved/:userID", async (req, res) => {
  const user = await Usermodel.findById(req.params.userID);
  try {
    const savedRecipies = await Recipiesmodel.find({
      _id: { $in: user.savedRecipies },
    });
    res.json({ savedRecipies });
  } catch (err) {
    res.json(err);
  }
});


router.get("/recipieDetails/:recipieID", async(req,res)=>{
  try{
    let recipie = await Recipiesmodel.findById(req.params.recipieID);
    res.status(200).json({ recipie });
  }catch(err){
    res.status(500).json(err);
  }
})
export { router as RecipeRouter };
