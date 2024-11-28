import React, { useState, useEffect } from "react";
import './Shows.css';

function Shows({ selectedMovie, setSelectedShow }) {
    const [shows, setShows] = useState([]);

   
    useEffect(() => {
        if (selectedMovie && selectedMovie._id) {
            console.log(selectedMovie._id);
            fetch(`http://localhost:3000/api/shows/movie/${selectedMovie._id}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('no response');
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log("shows:", data);  
                    setShows(data);
                })
                .catch((err) => {
                    console.error("error fetching shows:", err); 
                });
        }
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
                     
                    </div>
                </div>

             {/* med hjälp av ChatGPT */}
                <div className="main-show-container">
                    <p className="show-subheading">SCREENINGS</p>

                    {shows.length === 0 ? (
                        <p>Not workinggg</p>
                    ) : (
                        shows.map((show) => (
                            <div className="show-container" key={show._id}>
                                <button
                                    className="screenings-button"
                                    onClick={() => {
                                        setSelectedShow(show);
                                        console.log("Selected screening:", show);
                                    }}
                                >
                                    {/* Format the show start time using `dateTime` */}
                                    {new Date(show.dateTime).toLocaleString('en-US', {
                                        weekday: 'short',
                                        day: 'numeric',
                                        month: 'short',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                    })}
                                    <p>{show.seats.length} seats left</p> 
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default Shows;
