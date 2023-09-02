<script setup>
  import PostsListItem from './PostsListItem.vue';

  defineProps({
    posts: Array
  })
</script>


<template>
  <div class="flex flex-col justify-center gap-y-10 md:gap-x-8 md:gap-y-20 transform md:flex-row md:flex-wrap">
    <PostsListItem
      v-for="(post, index) in posts"
      :key="post._id"
      :class="(index % 2 === 0 ? 'md:-rotate-3 md:-translate-y-3' : 'md:rotate-3 md:translate-y-3')"
      :message="post.message"
      :title="post.title" />
  </div>
</template>