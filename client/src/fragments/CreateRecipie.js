import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css-fragments/createRecipie.css";

export default function CreateRecipie() {
  const userID = window.localStorage.getItem("userID");
  const navigate = useNavigate();

  const [recipie, setRecipie] = useState({
    name: "",
    ingredients: [""],
    instructions: [""],
    imgUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const inputChange = (event) => {
    const { name, value } = event.target;
    setRecipie({ ...recipie, [name]: value });
  };

  const addingredients = () => {
    setRecipie({ ...recipie, ingredients: [...recipie.ingredients, ""] });
  };

  const ingredientsChange = (event, idx) => {
    const { value } = event.target; //getting the event-target-value :)
    const ingredients = recipie.ingredients;
    ingredients[idx] = value;
    setRecipie({ ...recipie, ingredients });
  };
  const instructionsChange = (event, idx) => {
    const { value } = event.target; //getting the event-target-value :)
    const instructions = recipie.instructions;
    instructions[idx] = value;
    setRecipie({ ...recipie, instructions });
  };

  const addinstructions = () => {
    setRecipie({ ...recipie, instructions: [...recipie.instructions, ""] });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/recipies", recipie);
      alert("Recipe Created.!");
    } catch (err) {
      console.log(err);
    }
    navigate("/");
  };

  return (
    <>
      <section>
        <div className="create-recipie-container">
          <form id="create-recipie" onSubmit={(event) => onSubmit(event)}>
            <h1>Create Recipe</h1>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name of Dish"
              required="required"
              onChange={inputChange}
            />

            <fieldset>
              <legend>Ingredients:</legend>
              <ul>
                {recipie.ingredients.map((elements, idx) => (
                  <li key={idx}>
                    <input
                      type="text"
                      name="ingredients"
                      value={elements}
                      onChange={(event) => ingredientsChange(event, idx)}
                    />
                  </li>
                ))}
              </ul>
              <button type="button" onClick={addingredients}>
                Add more+
              </button>
            </fieldset>

            <fieldset>
              <legend>Instructions:</legend>
              <ol>
                {recipie.instructions.map((elements, idx) => (
                  <li key={idx}>
                    <input
                      type="text"
                      name="instructions"
                      value={elements}
                      onChange={(event) => instructionsChange(event, idx)}
                    />
                  </li>
                ))}
              </ol>
              <button type="button" onClick={addinstructions}>
                Add more+{" "}
              </button>
            </fieldset>

            <input
              type="text"
              name="imageUrl"
              id="imageUrl"
              placeholder=" Paste image address link here"
              required="required"
              onChange={inputChange}
            />
            <input
              type="number"
              name="cookingTime"
              id="cookingTime"
              placeholder="Cooking time in min."
              required="required"
              onChange={inputChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
    </>
  );
}
