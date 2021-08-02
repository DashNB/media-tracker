import "./App.css";
import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import dotenv from "dotenv/config";
import axios from "axios";
import Movie from "./Movie";

const popularMoviesAPI = process.env.REACT_APP_API_MOVIE_POPULAR;
function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [favoriteMovies, setFavoriteMovies] = useState([]);

  function getMovies(API) {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }

  async function addMovie(movieID) {
    if (!favoriteMovies.includes(movieID)) {
      setFavoriteMovies((prevMovies) => [...prevMovies, movieID]);
    }

    // eslint-disable-next-line no-unused-vars
    const userFavorite = { favorite: favoriteMovies };

    axios
      .post("http://localhost:3001/userFavorite", favoriteMovies)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));


  }

  useEffect(() => {
    getMovies(popularMoviesAPI);
  }, []);

  function handleOnSubmit(event) {
    event.preventDefault();

    if (searchTerm) {
      getMovies(process.env.REACT_APP_API_SEARCH + searchTerm);
    }

    setSearchTerm("");
  }
  function handleOnChange(event) {
    setSearchTerm(event.target.value);
  }
  return (
    <>
      <header>
        {/* <button className="btn-fav" type="submit">
          Favorite
        </button> */}
        <ul className="ul-header">
          <li className="li">Favorites</li>
          <li className="li">Popular</li>
        </ul>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="text"
            placeholder="Title Search"
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.map((movie) => (
          <Movie id={movie.id} data={movie} addMovie={addMovie} />
        ))}
      </div>
    </>
  );
}

export default App;
