import React from "react";
import { Link } from "react-router-dom";

function CocktailCard({ cocktail }) {
  return (
    <div className="col-md-4 mb-4 text-center">
      <div className="card shadow-sm" style={{backgroundColor: '#ff2'}}>
        <img
          src={cocktail.imageUrl}
          className="card-img-top img-fluid"
          alt={cocktail.name}
          style={{ height: "300px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{cocktail.name}</h5>
          <p className="card-text">
            <b>Taste:</b> {cocktail.taste.join(", ")}
          </p>
          <p className="card-text">
            <b>Ingredients:</b> {cocktail.ingredients.map((ingredient) => ingredient.item).join(", ")}
          </p>
          <Link to={`/cocktail/${cocktail._id}`} className="btn  text-dark">
            View Details
          </Link>
          <button className="btn  text-dark ms-2">Bookmark</button>
        </div>
      </div>
    </div>
  );
}

export default CocktailCard;
