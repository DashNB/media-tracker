/* eslint-disable camelcase */
import React from "react";
import "./movie.css";
// eslint-disable-next-line no-unused-vars
import dotenv from "dotenv/config";

function Movie(props) {
  const { data } = props;
  const { title, overview, poster_path, vote_average } = data;
  console.log(overview + vote_average + title);
  // console.log(process.env.REACT_APP_IMG+poster_path)
  // const =props.data
  return (
    <div className="movie">
      <img src={process.env.REACT_APP_IMG + poster_path} alt={title} />
      <div className="movie-info">
        <h3>{title}</h3>
        <span>{vote_average}</span>
      </div>
      <div className="movie-overview">
        <h2>Overview</h2>
        <p>{overview}</p>
      </div>
    </div>
  );
}

export default Movie;
