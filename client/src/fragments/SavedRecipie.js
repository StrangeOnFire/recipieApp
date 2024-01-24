import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SavedRecipie() {
  const [savedRecipies, setSavedRecipies] = useState([]);

  const navigate = useNavigate();

  const userID = window.localStorage.getItem("userID");
  useEffect(() => {
    if (!userID) {
      alert("Login to vist Saved-Recipe.!");
      navigate("/auth");
    }else{
      fetchSavedRecipie();
    }
  }, []);
  const fetchSavedRecipie = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/recipies/saved/${userID}`
      );
      setSavedRecipies(response.data.savedRecipies);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <div className="main">
        <h1>Recipes</h1>
        <ul className="cards">
          {savedRecipies.map((items) => (
            <li className="cards_item" key={items.name}>
              <div className="card">
                <div className="card_image">
                  <img src={items.imageUrl} />
                </div>
                <div className="card_content">
                  <h2 className="card_title">{items.name}</h2>
                  <p className="card_text">
                    Cooking Time : {items.cookingTime}mins.
                  </p>
                  <button className="btn card_btn">Read More</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <h3 className="made_by">Made with ♡ by Ayush</h3>
    </div>
  );
}

export default SavedRecipie;
