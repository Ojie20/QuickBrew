import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function SearchBar({ onSearch }) {
  const [ingredient, setIngredient] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(ingredient);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <a className="navbar-brand" href="/">
            <img src="public/QuickBrewLogo.svg" alt="Logo" width="30" height="30" className="d-inline-block align-top" />
            QuickBrew
        </a>

        <form className="d-flex ms-auto" onSubmit={handleSubmit} >
        <input
            type="text"
            className="form-control me-2"
            placeholder="Search by ingredient..."
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">Search</button>
        </form>
    </nav>
  );
}

export default SearchBar;