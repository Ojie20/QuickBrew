import React, { useState, useEffect } from "react";
import api from "./api";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Login from "./pages/Login";
import LandingCard from "./components/landingCard";
import SearchBar from "./components/searchbar";
import CocktailList from "./components/cocktailList";
import CocktailDetails from "./pages/cocktailDetails";
import Bookmarks from "./pages/bookmarks";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cocktails, setCocktails] = useState([]);
  const [searched, setSearched]= useState(false);

  const fetchCocktails = async (ingredient) => {
    try {
      if (ingredient) {
        setSearched(true)
      }
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
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  if (searched){
    return (
      <Router>
        <Routes>
          <Route path="/login" element={
            <Login onLogin={()=>setIsLoggedIn(true)}/>} />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <div className="">
                <SearchBar onSearch={fetchCocktails} />
                <CocktailList cocktails={cocktails} />
              </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="/cocktail/:id" element={<CocktailDetails />} />
        </Routes>
      </Router>
    );
  }
  else {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={
            isLoggedIn ? <Navigate to="/"/> : <Login onLogin={()=>setIsLoggedIn(true)}/>} />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <div className="">
                <SearchBar onSearch={fetchCocktails} />
                <LandingCard />
                <CocktailList cocktails={cocktails} />
              </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/bookmarks" element={isLoggedIn ? <Bookmarks /> : <Navigate to="/login" />} />
          <Route path="/cocktail/:id" element={<CocktailDetails />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
