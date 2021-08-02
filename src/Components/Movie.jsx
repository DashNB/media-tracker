/* eslint-disable camelcase */
import React from "react";
import "./Movie.css";
import { IconButton } from "@material-ui/core";
// eslint-disable-next-line no-unused-vars
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import dotenv from "dotenv";

dotenv.config();

function Movie(props) {
  const { data,addMovie, id} = props;
  const { title, overview, poster_path, vote_average } = data;
  const defaultIMG =
    "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1534&q=80";
  function setVoteClass(vote) {
    if (vote >= 8) {
      return "green";
    }
    if (vote >= 6) {
      return "orange";
    }
    return "red";
  }
  function onAdd(){
    addMovie(id)
  }
  return (
    <div className="movie">
      <img
        src={poster_path ? process.env.REACT_APP_IMG + poster_path : defaultIMG}
        alt={title}
      />
      <IconButton onClick ={onAdd} className='icon-button'>
        <AddBoxOutlinedIcon
          className="img-btn"
          color="primary"
          fontSize="large"
        />
      </IconButton>

      <div className="movie-info">
        <h3>{title}</h3>

        <span className={`tag ${setVoteClass(vote_average)}`}>
          {vote_average}
        </span>
      </div>
      <div className="movie-overview">
        <h2>Overview</h2>
        <p>{overview}</p>
      </div>
    </div>
  );
}

export default Movie;
