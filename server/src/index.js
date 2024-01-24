import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { UserRouter } from "../routes/users.js";
import { RecipeRouter } from "../routes/recipies.js";


const app = express();

//express middleware
app.use(express.json());
app.use(cors());

app.use("/auth", UserRouter);
app.use("/recipies", RecipeRouter);
// connection to DB
mongoose.connect(
  "mongodb+srv://ayush:lLUy3kpr6ZBXnzy7@mernrecipie.bebc7gf.mongodb.net/mernrecipies?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).catch((err)=>{console.log(err)});

// listning to port
app.listen(3001);

