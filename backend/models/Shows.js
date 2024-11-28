import mongoose from 'mongoose';
import Movie from './Movies.js';

// med hjälp av ChatGPT
const seatSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true }, 
  isBooked: { type: Boolean, default: false }  
});

const showSchema = new mongoose.Schema({
  movieId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: {Movie}, 
    required: true 
  },
  dateTime: { 
    type: Date, 
    required: true 
  },
  seats: [seatSchema] 
});

const Show = mongoose.model('Show', showSchema);

export default Show;
