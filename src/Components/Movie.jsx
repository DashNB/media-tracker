/* eslint-disable camelcase */
import React, { useEffect } from "react";
import useStateRef from "react-usestateref";
import "./Movie.css";
import axios from "axios";
import { IconButton } from "@material-ui/core";
// eslint-disable-next-line no-unused-vars
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import dotenv from "dotenv";

dotenv.config();

function Movie(props) {
  // eslint-disable-next-line no-unused-vars
  const [isIdFavorited, setIsIdFavorite, IsIdFavoriteref] = useStateRef(false);
  const { data, addMovie, id, onRemove } = props;
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
   function onAdd() {
    const result = addMovie(id); // result bool
    console.log(` onAdd result :${result}`);
    setIsIdFavorite(result);
  }

   function onRemoveID() {
    const result =  onRemove(id); // result bool
    console.log(` onRemoveID result :${result}`);
    setIsIdFavorite(result);
  }

  function buttonchange() {
    if (IsIdFavoriteref.current){
        return (
        <IconButton onClick={onRemoveID} className="icon-button">
          <RemoveCircleOutlineIcon
            className="img-btn"
            color="primary"
            fontSize="large"
          />
        </IconButton>)}
     return (
      <IconButton onClick={onAdd} className="icon-button">
        <AddBoxOutlinedIcon
          className="img-btn"
          color="primary"
          fontSize="large"
        />
      </IconButton>)
    
  }
  useEffect(() => {
    const checkID = async () => {
      const userFavorite = { favorite: id, action: "check" };
      // console.log(useSrFavorite)
      await axios
        .post("http://localhost:3001/userFavorite", userFavorite)
        .then((response) => setIsIdFavorite(response.data))
        .catch((err) => console.log(err));
    };
    console.log(
      `useEffect - id ${id} html tag conditional: ${IsIdFavoriteref.current}`
    );
    checkID();
    buttonchange() 
  }, [IsIdFavoriteref.current]);



  return (
    <div className="movie">
      <img
        src={poster_path ? process.env.REACT_APP_IMG + poster_path : defaultIMG}
        alt={title}
      />

      {buttonchange()}

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
