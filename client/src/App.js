import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";

function App() {
  const [recipies, setRecipies] = useState([]);
  const [savedRecipies, setSavedRecipies] = useState([]);

  const userID = window.localStorage.getItem("userID");

  const fetchRecipie = async () => {
    try {
      const response = await axios.get("http://localhost:3001/recipies");
      setRecipies(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchRecipie();
    fetchSavedRecipie();
  }, []);

  const savingRecipie = async (recipieID) => {
    if (!userID) {
      alert("Login to Save Recipe.!");
    } else {
      try {
        const response = await axios.put("http://localhost:3001/recipies", {
          recipieID,
          userID,
        });
        setSavedRecipies(response.data.savedRecipies);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const fetchSavedRecipie = async () => {
    if (userID) {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipies/savedRecipies/${userID}`
        );
        setSavedRecipies(response.data.savedRecipies);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const isRecipieSaved = (id) => {
    if (userID) {
      return savedRecipies.includes(id);
    }
  };
  return (
    <div className="App">
      <div className="main">
        <h1>Recipes</h1>
        <ul className="cards">
          {recipies.map((items) => (
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
                  <button
                    className="btn card_btn save-recipie"
                    onClick={() => savingRecipie(items._id)}
                    disabled={isRecipieSaved(items._id)}
                  >
                    {" "}
                    {isRecipieSaved(items._id) ? "Saved" : " Save Recipe"}
                  </button>
                    <Link to={`/recipie-details/${items._id}`} >
                  <button className="btn card_btn">
                    Read More
                   </button>
                    </Link>
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

export default App;
