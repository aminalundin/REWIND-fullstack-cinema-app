import mongoose from 'mongoose';

// const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
 
});

const Movie = mongoose.model('movies', movieSchema);
export default Movie;