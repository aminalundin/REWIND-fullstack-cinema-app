import express from 'express';
import cors from 'cors'
// import { movieSchema } from './models/Movies.js' 
import Movie from './models/Movies.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// const MONGO_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
const MONGO_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

// console.log(MONGO_URI)

// const uri = "mongodb+srv://lundinamina1:hejmongoDB@case8.xts2w.mongodb.net/";
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected');
   
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });

const PORT = 3000;


const app = express();

app.use(cors())

// const movies = movieSchema;

// routes, listen on requests
app.get('/data', async (req, res) => {

    try {
        const data = await Movie.find()
        res.json(data)
    } catch(error) {
        console.error(error)
        res.status(500).json({ error: "Failed to fetch movies" });
 
    }

    // res.send("Hello! it worked");
});


app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
})
