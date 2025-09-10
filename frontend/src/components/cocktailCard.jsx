import React from "react";

function CocktailCard({ cocktail }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h2>{cocktail.name}</h2>
      <img src={cocktail.imageUrl} alt={cocktail.name} width="200" />
      <p><b>Taste:</b> {cocktail.taste.join(' ')}</p>
      <p><b>Garnish:</b> {cocktail.garnish}</p>
      <h4>Ingredients:</h4>
      <table>
        <tr>
          <th>Item</th>
          <th>Amount</th>
        </tr>
        {cocktail.ingredients.map((ing, idx) => (
          <tr key={idx}>
            <td>{ing.item}</td>
            <td>{ing.amount}</td>
          </tr>
        ))}
      </table>
      <h4>Procedure:</h4>
      <ol>
        {cocktail.procedure.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

export default CocktailCard;
