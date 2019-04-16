<template>
<div>
  <h2>Total Counts</h2>
  <div class="image" v-for="pokemon in pokemons" v-bind:key="pokemon._id">
    <p class="pokemonTitle">{{name(pokemon.pokeId)}}
    <span v-if="pokemon.count">{{pokemon.count}}</span>
    </p>
    <p v-if="pokemon.created" class="pokemonDate">
      {{formatDate(pokemon.created)}}
    </p>
    <p>{{pokemon.description}}</p>
  </div>
</div>
</template>
<script>
import moment from 'moment';

export default {
  name: 'PokemonGallery',
  props: {
    pokemons: Array
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    goToPokemonPage(id) {
      console.log('test', id);
      this.$router.push(`/pokemon/${id}`);
    },
    name(id) {
      if(typeof id !== 'number') {
        return 'unknown';
      }
      if (this.$store.state.allPokemon.length === 0) {
        return 'loading...';
      }
      return this.$store.state.allPokemon[id].name;
    }
  }

}
</script>

<style scoped>
.pokemonTitle {
  margin: 0px;
  font-size: 1.2em;
}

.pokemonDate {
  margin: 0px;
  font-size: 0.9em;
  font-weight: normal;
}

p {
  margin: 0px;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  max-width: 600px;
  max-height: 600px;
  image-orientation: from-image;
}
</style>

