const express = require('express');
const app = express();
const cors = require('cors');
const ObjectId = require('mongodb')
const { connectDB, getDB } = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// Connect to the database before starting the server
connectDB().then(() => {
    console.log("Database connection established");
    const db = getDB();
    const cocktailsCollection = db.collection('recipes');

    app.post('/register', async(req,res)=>{
        try{
            const {username, password} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {username, password: hashedPassword};
            const result = await db.collection('users').insertOne(newUser);
            res.status(201).send("User registered successfully");
        }
        catch(err){
            console.error("Error during registration:", err);
            res.status(500).send("Internal Server Error");
        }
    })

    app.post('/login', async(req,res)=>{
        try{
            const {username, password} = req.body;
            const user = await db.collection('users').findOne({username});
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).send("Invalid credentials");
            }
            const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ token });
        }catch(err){
            console.error("Error during login:", err);
            res.status(500).send("Internal Server Error");
        }
    })

    function authenticateToken(req, res, next) {
        const token = req.headers['authorization'];
        if (!token) return res.sendStatus(401);
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    }

    app.get('/cocktails', async (req, res) => {
        try {            
            const allCocktails = await cocktailsCollection.find({}).toArray();
            
            
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
    });

    app.post('/bookmark', authenticateToken, async (req,res)=>{
        const {cocktailId} = req.body;
        const userId = req.user.id;
        await db.collection('bookmarks').updateOne(
            { userId},
            { $addToSet: { cocktails: cocktailId } },
            { upsert: true }
        );
        res.send("Cocktail bookmarked");
    })

    app.get('/bookmarks', authenticateToken, async (req, res)=> {
        try{
            const userId = req.user.id;
            const bookmarksCollection = db.collection('bookmarks');
            const cocktailsCollection = db.collection('recipes');

            const userBookmarks = await bookmarksCollection.findOne({ userId });
            console.log("User bookmarks document:", userBookmarks);
            

            const cocktailIds = userBookmarks.cocktails || [];
            console.log("User's bookmarked cocktail IDs:", cocktailIds);
            

            const cocktails = await cocktailsCollection.find({ _id: { $in: cocktailIds.map(id => new ObjectId.ObjectId(id))}})
            .toArray();
            res.json(cocktails);
        }catch(err){
            console.error("Error fetching bookmarks:", err);
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