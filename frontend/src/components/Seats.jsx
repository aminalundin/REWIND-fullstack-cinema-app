import React, { useState } from "react";
import AvailableSeat from "./AvailableSeat";
import BookedSeat from "./BookedSeat";
import './Seats.css';

function Seats({ selectedMovie, selectedShow, setName, setEmail, setSelectedSeats, setTotalPrice, setBooking }) {
    // räknare för hur många säten som är valda
    const [count, setCount] = useState(0);
    // räknare för pris på total summan
    const [totalCount, setTotal] = useState(0);
    const [selectedSeats, updateSelectedSeats] = useState([]);



    // en funktion som kan öka och sänka totala biljetter valda med n som obestämd number
    const increment = (n) => {
        setCount(count + n);
    };

    // en funktion som kan höja och sänka pris beroende på hur många säten som är valda
    // använder samma n som obestämd number som sen gångas med priset per biljett
    const total = (n) => {
        setTotal(totalCount + n * 100);
    };

    // en tom array för säten
    const seats = [];

    // loopar igenom tillgängliga säten från api och pushar in de som är tillgängliga till den tomma arrayen
    selectedShow.availableSeats.forEach((seat) => {
        seats.push({ seatNumber: seat, isAvailable: true });
    });

    // loopar igenom de otillgängliga sätena från api och pushar in dem i seats arrayen
    selectedShow.bookedSeats.forEach((seat) => {
        seats.push({ seatNumber: seat, isAvailable: false });
    });

    // fick hjälp av ChatGPT....
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
        console.log(name, email);

        setName(name);
        setEmail(email);
        setTotalPrice(totalCount);

        console.log(selectedSeats)

        const obj = {

            "email": email,
            "show": selectedShow._id,
            "seats": selectedSeats

        }
        console.log(obj)

        const options = {
            headers: {
                //   'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(obj)
        }

        fetch("https://cinema-api.henrybergstrom.com/api/v1/bookings", options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setBooking(data)
            })
            
    };



    return (
        <>
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
                        <img src="./src/assets/images/screen.png" alt="" />
                    </div>

                </div>

                <div className="seat-map">

                    {/* mappar ut tillgängliga säten och implementerar AvailableSeat som gör det möjligt att välja lediga platser */}
                    {seats.map((seat, index) => {
                        if (seat.isAvailable) {
                            return (
                                <AvailableSeat
                                    seat={seat}
                                    key={index}
                                    increment={increment}
                                    total={total}
                                    handleSeatSelection={handleSeatSelection}
                                />
                            );
                        } else {
                            // returnerar BookedSeat som inte gör det möjligt att boka upptagna platser
                            return (
                                <BookedSeat seat={seat} key={index} />
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
        </>
    );
}

export default Seats;
