import "./App.css";
import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import dotenv from "dotenv/config";
import Movie from "./Movie";

// dotenv.config()
const popularMoviesAPI = process.env.REACT_APP_API_MOVIE_POPULAR;
function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(popularMoviesAPI)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);

  return (
    <>
      <header>
        <input className="search" type="text" placeholder="Title Search" />
      </header>
      <div className="movie-container">
        {movies.map((movie) => (
          <Movie key={movie.id} data={movie} />
        ))}
      </div>
    </>
  );
}

export default App;
