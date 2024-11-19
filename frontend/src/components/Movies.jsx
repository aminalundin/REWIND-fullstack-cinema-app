import React, { useState, useEffect } from "react";
import "./Movies.css";


function Movies({ selectedMovie, setSelectedMovie }) {

    // fetchar alla filmer från API
    const [movies, setMovies] = useState([]);

    let url = "https://cinema-api.henrybergstrom.com/api/v1/movies";

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setMovies(data);
            });
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
                        <div className="movie-container" key={index}>
                            <div
                                className="movie-poster"
                                onClick={() => {
                                    // bestämmer vilken film som är vald och gör det möjligt att få fram
                                    // information enbart relaterat till vald/klickad fikm
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
