import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Show from './models/Shows.js'; 
import Movie from './models/Movies.js';
import { Types } from 'mongoose';

dotenv.config();

// console.log(MONGO_URI)

// const uri = "mongodb+srv://lundinamina1:hejmongoDB@case8.xts2w.mongodb.net/";

const MONGO_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });

const app = express();
app.use(cors());
app.use(express.json()); 

const PORT = 3000;

// const movies = movieSchema;

// routes, listen on requests

app.get('/data', async (req, res) => {
    try {
        const data = await Movie.find();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }

    // res.send("Hello! it worked");
});


app.get('/api/shows/movie/:movieId', async (req, res) => {
    try {
        const { movieId } = req.params;
       
        const shows = await Show.find({ movieId });  
        if (!shows || shows.length === 0) {
            return res.status(404).json({ error: 'no shows found' });
        }
        res.json(shows);  
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'failed to fetch shows' });
    }
});



app.get('/api/shows/:id', async (req, res) => {
    try {
        const showId = req.params.id;
        const show = await Show.findById(showId).populate('movieId'); 
        if (!show) {
            return res.status(404).json({ error: 'Show not found' });
        }
        res.json(show); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch show' });
    }
});


// med hjälp av ChatGPT
app.post('/api/bookings', async (req, res) => {
    try {
        const { name, email, showId, seats: selectedSeats } = req.body;

      
        const show = await Show.findById(showId);
        if (!show) {
            return res.status(404).json({ error: 'show not found' });
        }

      
        const updatedSeats = show.seats.map((seat) => {
            if (selectedSeats.includes(seat.seatNumber)) {
                return { ...seat, isBooked: true }; 
            }
            return seat;
        });

        
        show.seats = updatedSeats;
        await show.save();

        
        const booking = {
            name,
            email,
            showId,
            seats: selectedSeats,
        };

       
        res.status(200).json({ message: 'Booking successful!', booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to complete booking' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
