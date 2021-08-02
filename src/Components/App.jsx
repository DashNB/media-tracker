import "./App.css";
import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import dotenv from "dotenv/config";
import axios from "axios";
import Movie from "./Movie";

const popularMoviesAPI = process.env.REACT_APP_API_MOVIE_POPULAR;
function App() {
  // const [isIdFavorited, setIsFavorite] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const [checkfavoriteID, setcheckfavoriteID] = useState([]);
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
    const userFavorite = { favorite: favoriteMovies, action: "add" };

    await axios
      .post("http://localhost:3001/userFavorite", userFavorite)
      .then(()=>true)
      .catch((err) => console.log(err));


  }

  async function onRemove(movieID) {
    const userFavorite = { favorite: movieID, action: "remove" };
    await axios
      .post("http://localhost:3001/userFavorite", userFavorite)
      .then(()=>false)
      .catch((err) => console.log(err));

    return false;
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
          <Movie
            id={movie.id}
            data={movie}
            addMovie={addMovie}
            onRemove={onRemove}
          />
        ))}
      </div>
    </>
  );
}

export default App;
