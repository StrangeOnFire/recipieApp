import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Usermodel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await Usermodel.findOne({ username });

  if (user) {
    return res.json({ message: "username already exists..!" });
  }
  const hashedpassword = await bcrypt.hash(password, 10);
  const newUser = new Usermodel({ username, password: hashedpassword });
  await newUser.save();
  res.json({ message: "username saved successfully..!" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Usermodel.findOne({ username });

  if (!user) {
    return res.json({ message: "User does not exists..!" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ message: "Username or Password is incorrect..!" });
  }

  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

export { router as UserRouter };
