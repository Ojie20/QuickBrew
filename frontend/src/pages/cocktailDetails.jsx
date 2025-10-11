import React, { useState, useEffect } from "react";
import api from "../api";
import { useParams } from "react-router-dom";

function CocktailDetails() {
  const [cocktail, setCocktail] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function fetchCocktailById() {
      try {
        const response = await api.get(`/cocktail/${id}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setCocktail(data);
      } catch (error) {
        console.error("Error fetching cocktail:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCocktailById();
  }, [id]);

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (!cocktail) return <div className="text-center mt-4">No cocktail found.</div>;

  return (
    <div className="container mt-4">
      <div className="card shadow-lg">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={cocktail.imageUrl}
              alt={cocktail.name}
              className="img-fluid rounded-start"
              style={{ height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">{cocktail.name}</h2>
              <p className="card-text">
                <b>Taste:</b> {cocktail.taste.join(", ")}
              </p>
              <h4>Ingredients:</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {cocktail.ingredients.map((ing, idx) => (
                    <tr key={idx}>
                      <td>{ing.item}</td>
                      <td>{ing.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h4>Procedure:</h4>
              <ol>
                {cocktail.procedure.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
              <p>
                <b>Garnish:</b> {cocktail.garnish}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CocktailDetails;