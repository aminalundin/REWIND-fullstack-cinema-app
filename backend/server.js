import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Show from './models/Shows.js';
import Movie from './models/Movies.js';
import Booking from './models/Bookings.js';

dotenv.config();

// Mongo URI variabler från .env
const MONGO_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

// koppling till databasen
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('connected');
    })
    .catch((err) => {
        console.error('could not connect', err);
    });

// skapar server
const app = express();
// cors gör det möjligt att fetcha lokalt
app.use(cors());
app.use(express.json());

const PORT = 3000;

// route för home/movie page
app.get('/data', async (req, res) => {
    try {
        const data = await Movie.find();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'failed to fetch movies' });
    }
});

// route för screenings till vald film
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

// route till specifik screening
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

// POST till databas med bookings, fick hjälp av ChatGPT
app.post('/api/bookings', async (req, res) => {
    try {
        const { name, email, showId, seats: selectedSeats } = req.body;

        // ser till att all data som krävs för att göra en bokning finns
        if (!name || !email || !showId || !selectedSeats || selectedSeats.length === 0) {
            return res.status(400).json({ error: 'Invalid booking data' });
        }

        // tar fram föreställningen med valt showId
        const show = await Show.findById(showId);
        if (!show) {
            return res.status(404).json({ error: 'Show not found' });
        }


        const unavailableSeats = selectedSeats.filter(seat =>
            // kollar i databasen (seats) om seatNumber är bokat
            show.seats.some(s => s.seatNumber === seat && s.isBooked)
        );
        if (unavailableSeats.length > 0) {
            return res.status(400).json({ error: `Seats already booked: ${unavailableSeats.join(', ')}` });
        }


        show.seats = show.seats.map(seat => {
            if (selectedSeats.includes(seat.seatNumber)) {
                // lägger till valt säte som bokat
                return { ...seat, isBooked: true };
            }
            return seat;
        });
        await show.save();


        const newBooking = new Booking({
            customer: { name, email },
            selectedSeats,
            showId
        });
        await newBooking.save();


        res.status(201).json({ message: 'Booking successful!', booking: newBooking });
    } catch (error) {
        console.error('Booking Error:', error);
        res.status(500).json({ error: 'Failed to complete booking' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
