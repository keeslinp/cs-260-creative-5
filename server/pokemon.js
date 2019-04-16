const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

const users = require("./users.js");
const User = users.model;
const pokemonSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  pokeId: Number,
  description: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);


// upload pokemon
router.post("/", auth.verifyToken, User.verify, async (req, res) => {

  const pokemon = new Pokemon({
    user: req.user,
    pokeId: req.body.pokeId,
    description: req.body.description,
  });
  try {
    await pokemon.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get my pokemons
router.get("/", auth.verifyToken, User.verify, async (req, res) => {
  // return pokemons
  try {
    let pokemons = await Pokemon.find({
      user: req.user
    }).sort({
      created: -1
    });
    return res.send(pokemons);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// Get a count of how many times each pokemon has been caught
router.get("/counts", async (req, res) => {
  try {
    let pokemons = await Pokemon.find({});
    let pokeCounts = pokemons.reduce((acc, poke) => {
      if (acc[poke.pokeId]) {
        acc[poke.pokeId] ++;
      } else {
        acc[poke.pokeId] = 1;
      }
      return acc;
    }, {});
    return res.send(pokeCounts);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.put("/:pokeId", async (req, res) => {
  try {
    let pokemon = await Pokemon.findOne({
      pokeId: req.params.pokeId,
      user: req.user,
      }).sort({
      created: -1
    }).populate('user');
    pokemon.description = req.body.description;
    return res.send(pokemon);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});


module.exports = {
  model: Pokemon,
  routes: router,
}

