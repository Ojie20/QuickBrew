import React from "react";
import { Link } from "react-router-dom";

function CocktailCard({ cocktail }) {
  return (
    <div className="card">
      <img src={cocktail.imageUrl} alt={cocktail.name} />
      <h3>{cocktail.name}</h3>
      <p><b>Taste:</b> {cocktail.taste.join(' ')}</p>
      {/* Link to full details page */}
      <Link to={`/cocktail/${cocktail._id}`}>View Details</Link>
    </div>
  );
}

export default CocktailCard;
