<template>
<div class="home">
  <pokemon-gallery :pokemons="pokemons" />
</div>
</template>

<script>
// @ is an alias to /src
import PokemonGallery from '@/components/PokemonGallery.vue'

export default {
  name: 'home',
  components: {
    PokemonGallery
  },
  computed: {
    pokemons() {
      return this.$store.state.pokemon;
    }
  },
  async created() {
    await this.$store.dispatch("getAllPokemon");
    await this.$store.dispatch("getPokemonCounts");
    await this.$store.dispatch("getAllPokemon");
  },
}
</script>
