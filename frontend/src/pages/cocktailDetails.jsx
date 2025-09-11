import React,{useState, useEffect, Suspense} from "react";
import { useParams } from "react-router-dom";


function CocktailDetails() {
    const [cocktail, setCocktail] = useState();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    function fetchCocktailById(id) {
        console.log(id);
        
        fetch(`http://localhost:5000/cocktail/${id}`) 
        .then((response) => {
            if (!response.ok) {throw new Error("Network response was not ok")}
            console.log(response);
            return response.json();
        })
        .then((data) => {console.log(data); setCocktail(data);})
        .catch((error) => console.error("Error fetching products:", error))
        .finally(() => setLoading(false));
    }
    useEffect(() => {
        fetchCocktailById(id);
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!cocktail) return <div>No cocktail found.</div>;
    return(
        
            <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
                <h2>{cocktail.name}</h2>
                <img src={cocktail.imageUrl} alt={cocktail.name} width="200" />
                <p><b>Taste:</b> {cocktail.taste.join(' ')}</p>
                <h4>Ingredients:</h4>
                <table>
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
                <p><b>Garnish:</b> {cocktail.garnish}</p>
            </div>
        
    )
};

export default CocktailDetails;