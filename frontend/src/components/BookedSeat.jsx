import React from "react";
import { useRef } from "react";

function BookedSeat({ seat }) {
    const ref = useRef()
    return (
        <>
            <button
                ref={ref}
                className="unavailable">

            </button>


        </>
    )
}

export default BookedSeat;