import React from "react";
import { Link } from "react-router-dom";

function CocktailCard({ cocktail }) {
  return (
    <div className="col-md-2 mb-4">
      <div className="card">
      <img src={cocktail.imageUrl} className="card-img-top img-thumbnail" alt={cocktail.name} />
      <div className="card-body">
        <h3 className="card-title">{cocktail.name}</h3>
        <p><b>Taste:</b> {cocktail.taste.join(' ')}</p>
        <p><b>Ingredients:</b> {cocktail.ingredients.map(ingredient => ingredient.item).join(', ')}</p>
        {/* Link to full details page */}
        <Link to={`/cocktail/${cocktail._id}`}>View Details</Link>
      </div>
    </div>
    </div>
  );
}

export default CocktailCard;
