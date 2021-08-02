/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require("cors");
require('dotenv').config();
const axios = require('axios').default;

const app = express(); 
const PORT=process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

// Schema
const userFavoriteSchema = new mongoose.Schema ({
  favoriteID:[]
})
// Collection 

// eslint-disable-next-line new-cap
const Favorite = new mongoose.model('Favorite',userFavoriteSchema)

app.post("/userFavorite",(req,res)=>{
  const userFavorite = req.body // array 
  // console.log(favorite)
  // eslint-disable-next-line array-callback-return
  userFavorite.map(id =>{
    Favorite.find({favoriteID:id},(foundIDs=>{
      if(foundIDs == null){
        Favorite.save()
      }

    }))
    
  })

  // const fav = new Favorite({favoriteMovies:userFavorite})
  // fav.save()
  // res.send("Success")
  res.send("Success")
})


app.get("/userFavorite",(req,res)=>{
  const userFavorite = req.body
  const fav = new Favorite({favoriteMovies:userFavorite})
  fav.save()
  res.send("Success")
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});