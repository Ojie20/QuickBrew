import React, { useState, useEffect } from "react";
import api from "./api";
import SearchBar from "./components/searchbar";
import CocktailList from "./components/cocktailList";

function App() {
  const [cocktails, setCocktails] = useState([]);


  const fetchCocktails = async (ingredient) => {
    if(ingredient){
      fetch(`http://localhost:5000/cocktails/search?ingredient=${ingredient}`) 
      .then((response) => response.json())
      .then((data) => setCocktails(data))
      .catch((error) => console.error("Error fetching products:", error));

      console.log(cocktails);
    }
    else{
      fetch("http://localhost:5000/cocktails") 
      .then((response) => response.json())
      .then((data) => setCocktails(data))
      .catch((error) => console.error("Error fetching products:", error));

      console.log(cocktails);
    }
  };
  useEffect(() => {
    fetchCocktails();
      
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cocktail Recipes 🍸</h1>
      <SearchBar onSearch={fetchCocktails} />
      <CocktailList cocktails={cocktails} />
    </div>
  );
}

export default App;
