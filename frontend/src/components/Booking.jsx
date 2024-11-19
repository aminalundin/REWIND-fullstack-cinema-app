import React from "react";
import './Booking.css';

function Booking({ name, email, seats, totalPrice, selectedMovie, selectedShow, booking }) {

    return (
        <>
            <div className="booking">

                <h2 className="booking-heading">BOOKING CONFIRMED</h2>

                <div className="booking-content">

                    <p> Dear {name},
                        Thank you for your booking! This message confirms your reservation.

                        Here are the details:
                    </p>

                    {/* visas efter post bekräftelse, state, true/false, promise */}
                    {booking.bookingTime}
                    <ul>
                        <li>MOVIE: {selectedMovie.title}</li>
                        <li>DATE/TIME: {selectedShow.startTime}</li>
                        <li>YOUR SEATS: {seats.join(", ")}</li>
                        <li>TOTAL PRICE: {totalPrice} :-</li>
                        <li>TICKETS SENT TO: {email}</li>

                    </ul>

                    <p>
                        We look forward to seeing you!
                    </p>

                </div>

            </div>
        </>
    );
}

export default Booking;
