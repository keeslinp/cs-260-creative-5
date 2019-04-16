<template>
<div>
  <h2>Total Counts</h2>
  <div class="image" v-for="pokemon in pokemons" v-bind:key="pokemon._id">
    <p class="pokemonTitle">{{name(pokemon.pokeId)}}
    <span v-if="pokemon.count">{{pokemon.count}}</span>
    <span v-if="pokemon.user">
      <a href="#" @click="deleteRecord(pokemon._id)"> <i class="fas fa-trash-alt"></i></a>
      <a href="#" @click="editRecord(pokemon._id)"><i class="fas fa-edit"></i></a>
    </span>
    </p>
    <p v-if="pokemon.created" class="pokemonDate">
      {{formatDate(pokemon.created)}}
    </p>
    <div v-if="editingRecord === pokemon._id">
      <div>
      <textarea v-model="description">
      </textarea>
      </div>
      <button @click="editRecord(null)">Cancel</button>
      <button @click="saveRecord">Save</button>
    </div>
    <p v-else>{{pokemon.description}}</p>
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
    name(pokeId) {
      if(typeof pokeId !== 'number') {
        return 'unknown';
      }
      if (this.$store.state.allPokemon.length === 0) {
        return 'loading...';
      }
      return this.$store.state.allPokemon[pokeId].name;
    },
    async deleteRecord(id) {
      await this.$store.dispatch("deleteRecord", id);
      await this.$store.dispatch("getMyPokemon");
    },
    async editRecord(id) {
      this.editingRecord = id;
      const pokemon = this.pokemons.find(poke => poke._id === id);
      this.description = pokemon ? pokemon.description : '';
    },
    async saveRecord() {
      await this.$store.dispatch("updateRecord", {
        id: this.editingRecord,
        description: this.description,
      });
      await this.$store.dispatch("getMyPokemon");
      this.editRecord(null);
    }
  },
  data() {
    return {
      editingRecord: null,
      description: '',
    };
  },
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

