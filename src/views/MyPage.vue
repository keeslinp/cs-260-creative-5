<template>
<div>
  <div v-if="user">
    <div class="header">
      <div>
        <h1>{{user.name}}</h1>
      </div>
      <div>
        <p>
          <a href="#" @click="logout"><i class="fas fa-sign-out-alt"></i></a>
        </p>
      </div>
    </div>
    <pokemon-gallery :pokemons="pokemon" />
    <div>
      <form @submit.prevent="submit">
        <select v-model="selectedPokemon">
          <option v-for="(pokemon, index) in allPokemon" :value="index">{{pokemon.name}}</option :key="pokemon._id" />
        </select>
        <p></p>
        <textarea v-model="description" placeholder="Description"></textarea>
        <p></p>
        <button type="submit" class="pure-button pure-button-secondary">Upload</button>
      </form>
    </div>
  </div>
  <div v-else>
    <p>If you would like to save a caught pokemon, please register for an account or login.</p>
    <router-link to="/register" class="pure-button">Register</router-link> or
    <router-link to="/login" class="pure-button">Login</router-link>
  </div>
</div>
</template>


<script>
import PokemonGallery from '@/components/PokemonGallery.vue'

export default {
  name: 'mypage',
  components: {
    PokemonGallery,
  },
  async created() {
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getMyPokemon");
    await this.$store.dispatch("getAllPokemon");
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
    async submit() {
      try {
      await this.$store.dispatch('submit', {
        pokeId: this.selectedPokemon,
        description: this.description,
      });
      this.selectedPokemon = 0;
      this.description = '';
      this.$store.dispatch("getMyPokemon");
      } catch (error) {
        console.error(error);
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    pokemon() {
      return this.$store.state.pokemon;
    },
    allPokemon() {
      return this.$store.state.allPokemon;
    },
  },
  data() {
    return {
      selectedPokemon: null,
      description: '',
    }
  },
}
</script>
<style scoped>
.header {
  display: flex;
}

.header a {
  padding-left: 50px;
  color: #222;
  font-size: 2em;
}

.header svg {
  margin-top: 12px;
}
</style>

