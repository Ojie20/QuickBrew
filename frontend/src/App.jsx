import React, { useState, useEffect } from "react";
import api from "./api";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import SearchBar from "./components/searchbar";
import CocktailList from "./components/cocktailList";
import CocktailDetails from "./pages/cocktailDetails";

function App() {
  const [cocktails, setCocktails] = useState([]);


  const fetchCocktails = async (ingredient) => {
    try {
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
    } catch (error) {
      console.error("Error fetching cocktails:", error);
    }
  };
  useEffect(() => {
    fetchCocktails();
      
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/cocktail/:id" element={<CocktailDetails />} />
        <Route path="/" element={
          <div style={{ padding: "20px" }}>
          
          <SearchBar onSearch={fetchCocktails} />
          <h1>Cocktail Recipes 🍸</h1>
          <CocktailList cocktails={cocktails} />
        </div>
        } />
      </Routes>
    </Router>
    
  );
}

export default App;
