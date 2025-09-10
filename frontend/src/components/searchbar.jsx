import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [ingredient, setIngredient] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(ingredient);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search by ingredient..."
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;