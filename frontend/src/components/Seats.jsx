import React, { useState, useEffect } from "react";
import AvailableSeat from "./AvailableSeat";
import BookedSeat from "./BookedSeat";
import './Seats.css';

function Seats({ selectedShow, setName, setEmail, setSelectedSeats, setTotalPrice, setBooking }) {
    const [seats, setSeats] = useState([]);
    // räknare för hur många säten som är valda
    const [count, setCount] = useState(0); 
        // räknare för pris på total summan
    const [totalCount, setTotal] = useState(0); 
    const [selectedSeats, updateSelectedSeats] = useState([]);

   
    useEffect(() => {
        if (selectedShow && selectedShow._id) {
            fetch(`http://localhost:3000/api/shows/${selectedShow._id}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Failed to fetch seat map");
                    }
                    return res.json();
                })
                .then((data) => {
                    setSeats(data.seats); 
                })
                .catch((error) => console.error("Error fetching seat map:", error));
        }
    }, [selectedShow]);

  // en funktion som kan öka och sänka totala biljetter valda med n som obestämd number
    const increment = (n) => {
        setCount(count + n);
    };
    // en funktion som kan höja och sänka pris beroende på hur många säten som är valda
    // använder samma n som obestämd number som sen gångas med priset per biljett
    const total = (n) => {
        setTotal(totalCount + n * 100);
    };

    const handleSeatSelection = (seatNumber) => {
        let updatedSeats;
        if (selectedSeats.includes(seatNumber)) {
            updatedSeats = selectedSeats.filter(seat => seat !== seatNumber);
        } else {
            updatedSeats = [...selectedSeats, seatNumber];
        }
        updateSelectedSeats(updatedSeats);
        setSelectedSeats(updatedSeats);
    };

        // får in information från formuläret som sen kan användas i booking confirmation
    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;

        setName(name);
        setEmail(email);
        setTotalPrice(totalCount);

        const obj = {
            email: email,
            show: selectedShow._id,
            seats: selectedSeats
        };

        const options = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(obj)
        };

        // fetch("https://cinema-api.henrybergstrom.com/api/v1/bookings", options)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setBooking(data);
        //     });
    };

    return (
        <div className="seats">
            <div className="seat-info-section">
                <div className="choose-seat-heading">CHOOSE YOUR SEATS</div>
                <div className="seat-info-icons">
                    <div className="available-icon"></div>
                    <div className="unavailable-icon"></div>
                    <div className="selected-icon"></div>
                </div>
                <div className="seat-info-text">
                    <p>available</p>
                    <p>unavailable</p>
                    <p>selected</p>
                </div>
                <div className="screen">
                    <img src="./src/assets/images/screen.png" alt="Screen" />
                </div>
            </div>

            <div className="seat-map">
                {seats.map((seat, index) => {
                    if (seat.isBooked) {
                        return <BookedSeat seat={seat} key={index} />;
                    } else {
                        return (
                            <AvailableSeat
                                seat={seat}
                                key={index}
                                increment={increment}
                                total={total}
                                handleSeatSelection={handleSeatSelection}
                            />
                        );
                    }
                })}
            </div>

            <div className="tickets-price">
                <p>Total: {count}</p>
                <p>Price: {totalCount}:-</p>
            </div>

            <form id="personal-details" onSubmit={handleSubmit}>
                <label htmlFor="name">NAME</label>
                <input type="text" id="name" required />
                <label htmlFor="email">EMAIL</label>
                <input type="email" id="email" required />
                <div className="submit-button-section">
                    <button type="submit" className="submit-button">GET TICKETS</button>
                </div>
            </form>
        </div>
    );
}

export default Seats;
