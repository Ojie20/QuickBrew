import React, { useState, useEffect } from "react";
import api from "./api";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import SearchBar from "./components/searchbar";
import CocktailList from "./components/cocktailList";
import CocktailDetails from "./pages/cocktailDetails";

function App() {
  const [cocktails, setCocktails] = useState([]);

  const fetchCocktails = async (ingredient) => {
    try {
      const response = ingredient
        ? await fetch(`http://localhost:5000/cocktails/search?ingredient=${ingredient}`)
        : await fetch("http://localhost:5000/cocktails");
      const data = await response.json();
      setCocktails(data);
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
        <Route
          path="/"
          element={
            <div className="container mt-4">
              <SearchBar onSearch={fetchCocktails} />
              <h1 className="text-center my-4">Cocktail Recipes 🍸</h1>
              <CocktailList cocktails={cocktails} />
            </div>
          }
        />
        <Route path="/cocktail/:id" element={<CocktailDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
