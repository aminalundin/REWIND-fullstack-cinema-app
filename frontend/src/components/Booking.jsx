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

                    {/* {booking.bookingTime} */}
                    <ul>
                        <li>MOVIE: {selectedMovie.title}</li>
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

// function Booking({ name, email, seats, totalPrice, selectedMovie, selectedShow, booking }) {
//     return (
//         <div className="booking">
//             <h2 className="booking-heading">BOOKING CONFIRMED</h2>
//             <div className="booking-content">
//                 <p>
//                     Dear {name},<br />
//                     Thank you for your booking! This message confirms your reservation.
//                 </p>
//                 <ul>
//                     <li>MOVIE: {selectedMovie.title}</li>
//                     <li>DATE/TIME: {new Date(selectedShow.dateTime).toLocaleString()}</li>
//                     <li>YOUR SEATS: {seats.join(", ")}</li>
//                     <li>TOTAL PRICE: {totalPrice} :-</li>
//                     <li>TICKETS SENT TO: {email}</li>
//                 </ul>
//                 <p>We look forward to seeing you!</p>
//                 <p>Booking Time: {new Date(booking.bookingTime).toLocaleString()}</p>
//             </div>
//         </div>
//     );
// }
