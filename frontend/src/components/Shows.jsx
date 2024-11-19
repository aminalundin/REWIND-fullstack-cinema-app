import React from "react";
import { useState, useEffect } from "react";
import './Shows.css';

function Shows({ selectedMovie, setSelectedShow }) {

    const [shows, setShows] = useState([]);

    // fetchar API för vald film med hjälp av att ID är sparat i en variabel
    let url = "https://cinema-api.henrybergstrom.com/api/v1/shows/movie/" + selectedMovie._id;
    // let url = 'inception.json'

    useEffect(() => {
        fetch(url)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data)
                setShows(data);
            });
        // en array av föreställningar för vald film
    }, [selectedMovie]);



    return (

        <>
            <div className="shows">

                <div className="selected-movie-info">

                    <div className="title">
                        <p>{selectedMovie.title.toUpperCase()}</p>
                    </div>

                    <div className="description">
                        <p>{selectedMovie.description}</p>
                    </div>

                    <div className="selected-movie-small-info">
                        <p>Genre: {selectedMovie.genre}</p>
                        <p>Director: {selectedMovie.director}</p>
                        <p>Duration: {selectedMovie.duration}</p>
                        <p>Released: {selectedMovie.releaseDate}</p>
                    </div>

                </div>

                <p className="show-subheading">SCREENINGS</p>


                {shows.map((show) => (
                    <div className="show-container" key={show._id}>

                        <button className="screenings-button" onClick={() => {

                            // bestämmer vilken föreställning som blivit vald
                            setSelectedShow(show)
                            console.log("screening:", show)
                        }}>
                            {show.startTime}

                            <p>{show.pricePerSeat} :-</p>

                        </button>

                    </div>

                ))}
            </div>


        </>
    )
}

export default Shows;