<template>
<div>
  <div v-for="comment in comments" v-bind:key="comment._id">
    <p class="commentDate">
      <span v-if="comment.user.name">{{comment.user.name}}, </span>
      {{formatDate(comment.created)}}
    </p>
    <p class="commentContent">{{comment.content}}</p>
  </div>
</div>
</template>
<script>
import moment from 'moment';

export default {
  name: 'ImageGallery',
  props: {
    comments: Array
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
  }
}
</script>

<style scoped>
p {
  margin: 0px;
}
.commentDate {
  margin: 0px;
  font-size: 0.9em;
  font-weight: normal;
}
</style>

