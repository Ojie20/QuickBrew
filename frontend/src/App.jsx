import React, { useState, useEffect } from "react";
import api from "./api";
import CocktailList from "./components/cocktailList";

function App() {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/cocktails") 
      .then((response) => response.json())
      .then((data) => setCocktails(data))
      .catch((error) => console.error("Error fetching products:", error));

      console.log(cocktails);
      
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cocktail Recipes 🍸</h1>
      <CocktailList cocktails={cocktails} />
    </div>
  );
}

export default App;
