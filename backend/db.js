const { MongoClient } = require('mongodb');
const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5";

const client = new MongoClient(uri);

let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db('Cocktail'); 
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err}`);
        throw err;
    }
}

function getDB() {
    if (!db) {
        throw new Error("Database not connected yet!");
    }
    return db;
}

module.exports = { connectDB, getDB };
