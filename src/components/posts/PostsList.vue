<script setup>
  import PostsListItem from './PostsListItem.vue';

  defineProps({
    posts: Array
  })
</script>


<template>
  <div class="flex flex-col justify-center gap-6 md:flex-row md:flex-wrap">
    <PostsListItem v-for="post in posts" :key="post._id" :message="post.message" :title="post.title" />
  </div>
</template>