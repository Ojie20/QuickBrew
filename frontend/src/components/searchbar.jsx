import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function SearchBar({ onSearch }) {
  const [ingredient, setIngredient] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(ingredient);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 mb-3 z-3" style={{ position: "sticky", top: 0, zIndex: 3 }}>
        <a className="navbar-brand" href="/">
            <img src="public/QuickBrewLogo.svg" alt="Logo" width="30" height="30" className="d-inline-block align-top" />
            QuickBrew
        </a>

        
        <form className="d-flex ms-auto" onSubmit={handleSubmit} >
        <input
            type="text"
            className="form-control me-3"
            placeholder="Search by ingredient or name..."
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
        />
        <button className="btn text-dark" type="submit">Search</button>
        </form>
        <Link to="/bookmarks" className="btn btn-outline-dark ms-3">Bookmarks</Link>
    </nav>
  );
}

export default SearchBar;