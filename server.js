/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios").default;
const { FaceOutlined } = require("@material-ui/icons");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// Schema
const userFavoriteSchema = new mongoose.Schema({
  favoriteID: [],
});
// Collection

// eslint-disable-next-line new-cap
const Favorite = new mongoose.model("Favorite", userFavoriteSchema);

function addMovie(idArray) {
  // eslint-disable-next-line array-callback-return
  idArray.map((id) => {
    // console.log(`ID: ${id}`);
    Favorite.countDocuments({ favoriteID: id }, (err1, count) => {
      // console.log(`count: ${count}`);
      // console.log(`count === 0: ${count === 0}`);
      if (err1) {
        console.log(err1);
      } else if (count === 0) {
        const userFavoriteSchemaTest = new Favorite({ favoriteID: id });

        userFavoriteSchemaTest.save((err2, movieID) => {
          if (err2) {
            console.log(err2);
          }
          // console.log(`${movieID} saved to Favorite collection.`);
        });
      }
    });
  });
}

async function removeID(id, req, res) {
  console.log(id)
  const result = await Favorite.deleteOne({ favoriteID: id });
  console.log(`ok? ${result.ok}. 1-no errors; 0 - no docs matched`);
}

function idExists(id, req, res) {
  Favorite.countDocuments({ favoriteID: id }, (err1, count) => {
    // console.log(`count: ${count}`);
    // console.log(`count === 0: ${count === 0}`);
    if (err1) {
      console.log(err1);
    } else if (count === 0) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
}

app.post("/userFavorite", (req, res) => {
  const { action, favorite } = req.body; // array
  switch (action) {
    case "add":
      addMovie(favorite);
      break;
    case "remove":
      removeID(favorite, req, res);
      break;
    case "check":
      idExists(favorite, req, res);
      break;
    default:
      console.log("Switch Error!");
  }

  // res.send("Success");
});

app.get("/userFavorite", (req, res) => {
  Favorite.find({}, "favoriteID", (err, foundIDs) => {
    if (err) {
      console.log(err);
    }
    res.send(foundIDs);
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
