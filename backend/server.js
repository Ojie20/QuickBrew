const express = require('express');
const app = express();
const cors = require('cors');
const ObjectId = require('mongodb')
const { connectDB, getDB } = require('./db');

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// Connect to the database before starting the server
connectDB().then(() => {
    console.log("Database connection established");
    const db = getDB();
    const cocktailsCollection = db.collection('recipes');

    app.get('/cocktails', async (req, res) => {
        try {
            console.log("Fetching all cocktails");
            
            const allCocktails = await cocktailsCollection.find({}).toArray();
            console.log(`Found ${allCocktails.length} cocktails`);
            
            res.json(allCocktails);
        } catch (err) {
            console.error("Error fetching cocktails:", err);
            res.status(500).send("Internal Server Error");
        }
    });

    app.get('/cocktail/:id', async (req,res)=>{
        try{
            const id = req.params.id;
            const cocktail = await cocktailsCollection.findOne({_id: new ObjectId.ObjectId(id)});
            if(!cocktail){
                return res.status(404).send("Cocktail not found");
            }
            res.json(cocktail);
        }
        catch(err){
            console.error("Error fetching cocktail by ID:", err);
            res.status(500).send("Internal Server Error");
        }
    })

    app.get('/cocktails/search', async (req, res)=> {
        try{
            const {ingredient} = req.query;

            let query = {};
            if(ingredient){
                query = { $text: { $search: `\"${ingredient}\"` } };
            }
            const results = await cocktailsCollection.find(query).toArray();
            res.json(results);
        }
        catch(err){
            console.error("Error searching cocktails:", err);
            res.status(500).send("Internal Server Error");
        }
    })

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
});