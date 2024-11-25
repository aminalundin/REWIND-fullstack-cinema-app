import React from "react";
import { useRef } from "react";

// med props som hämtar och skickar data/funktioner mellan komponenter 
function AvailableSeat({ seat, increment, total, handleSeatSelection }) {
    return (
        <>
        <div className="button-container">

            <button
                className="select-seat"
                onClick={(e) => {
                    // ett klick på knappen ändrar klass till selected för att man visuellt ska
                    // kunna se vad man har klickat på
                    e.target.classList.toggle("selected");

                    // lägger till increment och total funktion så att pris och antalet säten valda ändras
                    if (e.target.classList.contains("selected")) {
                        increment(1);
                        total(1);
                        handleSeatSelection(seat.seatNumber); 
                    } else {
                        // gör det möjligt att nollställa valda platser
                        increment(-1);
                        total(-1);
                        handleSeatSelection(seat.seatNumber); 
                    }
                }}
            >   
            {seat.seatNumber}
            </button>

            </div>
        </>
    );
}

export default AvailableSeat;
