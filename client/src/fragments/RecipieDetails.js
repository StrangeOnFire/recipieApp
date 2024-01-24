import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css-fragments/recipieDetails.css";

export default function RecipieDetails() {
  const [recipe, setRecipie] = useState({
    ingredients: [],
    instructions: [],
  });
  const navigate = useNavigate();
  const { recipieID } = useParams();
  useEffect(() => {
    fetchRecipie();
  }, []);

  const fetchRecipie = async () => {
    const response = await axios.get(
      `http://localhost:3001/recipies/recipieDetails/${recipieID}`
    );
    setRecipie(response.data.recipie);
  };

  return (
    <>
      <div className="recipie-details">
        <div className="h1">
          <button onClick={() => navigate(-1)}>{"<-"} </button>
          <h1>{recipe.name}</h1>
        </div>
        <img src={recipe.imageUrl} />
        <h6>Cooking Time - {recipe.cookingTime}mins. </h6>
        <p>{recipe.description}</p>
        <h2>Ingredients Required-</h2>
        <ul>
          {recipe.ingredients.map((items) => (
            <li key={items}> {items}</li>
          ))}
        </ul>
        <h2>How To Make {recipe.name}</h2>
        <ol>
          {recipe.instructions.map((items, idx) => (
            <li key={idx}>{items}</li>
          ))}
        </ol>
        <h3>{"Enjoy:)"}</h3>
      </div>
      <h3 className="made_by">Made with ♡ by Ayush</h3>
    </>
  );
}
