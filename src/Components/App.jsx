import "./App.css";
import useStateRef from 'react-usestateref'
import React, { useEffect} from "react";
// eslint-disable-next-line no-unused-vars
import dotenv from "dotenv/config";
import axios from "axios";
import Movie from "./Movie";

const popularMoviesAPI = process.env.REACT_APP_API_MOVIE_POPULAR;
function App() {
  const [movies, setMovies] = useStateRef([]);
  const [searchTerm, setSearchTerm] = useStateRef("");
  const [favoriteMovies, setFavoriteMovies,favoriteMoviesRef] = useStateRef([]);
  // eslint-disable-next-line no-unused-vars
  const [bool, setbool,boolref] = useStateRef(false);
  // eslint-disable-next-line no-unused-vars
  const [bool2, setbool2,boolref2] = useStateRef(false);

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
    const userFavorite = { favorite: favoriteMoviesRef.current, action: "add" };
    // console.log(userFavorite)
    await axios
      .post("http://localhost:3001/userFavorite", userFavorite)
      .then(() => {
        setbool(true);
      })
      .catch((err) => console.log(err));

      console.log(`App.jsx-addMovie -bool: ${boolref.current}`)
    // return boolref.current;
  }

  async function onRemove(movieID) {
    const userFavorite = { favorite: movieID, action: "remove" };

    await axios
      .post("http://localhost:3001/userFavorite", userFavorite)
      .then(() => {
        setbool(false);
      })
      .catch((err) => console.log(err));

    console.log(`App.jsx-onRemove -bool: ${boolref2.current}`)

    // return boolref.current;
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
            bool={boolref.current}
          />
        ))}
      </div>
    </>
  );
}

export default App;
