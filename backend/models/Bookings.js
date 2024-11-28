import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    customer: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    selectedSeats: { type: [String], required: true },
    showId: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
    bookingTime: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
