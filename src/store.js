import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    pokemon: [],
    comments: [],
    allPokemon: [],
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setPokemon(state, pokemon) {
      state.pokemon = pokemon;
    },
    setComments(state, comments) {
      state.comments = comments;
    },
    setAllPokemon(state, allPokemon) {
      state.allPokemon = allPokemon;
    },
  },
  actions: {
    async submit(context, data) {
      try {
        await axios.post('/api/pokemon', data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getAllPokemon(context) {
      try {
        let response = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=100");
        context.commit('setAllPokemon', response.data.results);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getPokemonCounts(context) {
      try {
        let response = await axios.get("/api/pokemon/counts");
        context.commit('setPokemon', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getMyPokemon(context) {
      try {
        let response = await axios.get("/api/pokemon");
        context.commit('setPokemon', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getAPokemon(context, pokeId) {
      try {
        const response = await axios.get(`/api/pokemon/${pokeId}`);
        context.commit('setPokemon', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async register(context, data) {
      try {
        let response = await axios.post("/api/users", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login(context, data) {
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async logout(context) {
      try {
        await axios.delete("/api/users");
        context.commit('setUser', null);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser(context) {
      try {
        let response = await axios.get("/api/users");
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return "";
      }
    }
  }
})
