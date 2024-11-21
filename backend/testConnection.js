import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
console.log(MONGO_URI)

const uri = "mongodb+srv://lundinamina:hejmongoDB-@amina-1.sl8n8.mongodb.net/?retryWrites=true&w=majority&appName=Amina-1";

mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to database');
   
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });
