import React, { useState, useEffect } from "react";
import "./Movies.css";

function Movies({ selectedMovie, setSelectedMovie }) {
   
    const [movies, setMovies] = useState([]);

   
    let url = "http://localhost:3000/data"; 
    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setMovies(data); 
            })
            .catch((error) => console.error("Error fetching movies:", error));
    }, []);

    return (
        <>
            <main>
                <div className="gradient"></div>
            </main>

            <aside>
                <p>WHATS ON</p>

                <div className="movies">
                    {movies.map((movie, index) => (
                        <div className="movie-container" key={movie._id || index}>
                            <div
                                className="movie-poster"
                                onClick={() => {
                                    console.log("Selected Movie:", movie);
                                    setSelectedMovie(movie);
                                }}
                            >
                                <img src={movie.posterUrl} alt={movie.title} />
                            </div>
                           
                        </div>
                    ))}
                </div>
            </aside>
        </>
    );
}

export default Movies;
