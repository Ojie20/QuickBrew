import React from "react";
import CocktailCard from "./cocktailCard";

function CocktailList({ cocktails }) {
  return (
    <div className="row mx-auto">
      {cocktails.length > 0 ? (
        cocktails.map((c) => <CocktailCard key={c._id} cocktail={c} />)
      ) : (
        <p>No cocktails found.</p>
      )}
    </div>
  );
}

export default CocktailList;
