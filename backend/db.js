const {MongoClient} = require('mongodb');
const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5"

const client = new MongoClient(uri);

let cocktailsCollection;
async function connectDB(){
    try{
        await client.connect();
        const db = client.db('Cocktail'); 
        cocktailsCollection = db.collection('recipes');
        console.log("Connected to MongoDB");
        const cursor = cocktailsCollection.find({}).sort({name:1});

        await cursor.forEach(recipe => console.log(recipe));

    }
    catch(err){
        console.log(`Error connecting to MongoDB: ${err}`);
        
    }
    finally{
        await client.close();
    }
}

function getCocktailsCollection() {
    if (!cocktailsCollection) {
      throw new Error("Database not connected yet!");
    }
    return cocktailsCollection;
  }


module.exports = {connectDB, getCocktailsCollection};
