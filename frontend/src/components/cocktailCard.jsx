import React from "react";
import { Link } from "react-router-dom";

function CocktailCard({ cocktail }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm">
        <img
          src={cocktail.imageUrl}
          className="card-img-top img-fluid"
          alt={cocktail.name}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{cocktail.name}</h5>
          <p className="card-text">
            <b>Taste:</b> {cocktail.taste.join(", ")}
          </p>
          <p className="card-text">
            <b>Ingredients:</b> {cocktail.ingredients.map((ingredient) => ingredient.item).join(", ")}
          </p>
          <Link to={`/cocktail/${cocktail._id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CocktailCard;
