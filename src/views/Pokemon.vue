<template>
<div>
    <pokemon-gallery :photos="photos" />
    <comments :comments="comments" />
    <form v-if="user" @submit.prevent="submitComment" class="pure-form pure-form-aligned create-comment">
      <fieldset>
        <div class="pure-control-group">
          <textarea v-model="commentContent">
          </textarea>
        </div>

        <div class="pure-controls">
          <button type="submit" class="pure-button pure-button-primary">Submit</button>
        </div>
      </fieldset>
    </form>
</div>
</template>


<script>
import PokemonGallery from '@/components/PokemonGallery.vue'
import Comments from '@/components/Comments.vue'

export default {
  name: 'photo',
  components: {
    PokemonGallery,
    Comments,
  },
  data() {
    return {
      commentContent: '',
    }
  },
  methods: {
    async submitComment() {
      const { id } = this.$route.params;
      try {
        this.error = await this.$store.dispatch("makeComment", {
          content: this.commentContent,
          photoId: id,
        });
        if (this.error === "") {
          this.loadComments();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async loadComments() {
      const { id } = this.$route.params;
      await this.$store.dispatch("getComments", id);
     }
  },
  async created() {
    const { id } = this.$route.params;
    await this.$store.dispatch("getAPhoto", id);
    this.loadComments();
  },
  computed: {
    photos() {
      return this.$store.state.photos;
    },
    comments() {
      return this.$store.state.comments;
    },
    user() {
      return this.$store.state.user;
    },
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
.create-comment {
  margin-top: 20px;
}
</style>


