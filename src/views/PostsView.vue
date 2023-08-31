<template>
  <main class="p-10 h-screen">
    <PostHeader class="mb-20" />
    <div v-if="loading" class="w-full flex justify-center p-20">
      <DataLoading />
    </div>
    <PostsList v-else :posts="posts" />
  </main>
</template>

<script setup>
  import { ref } from 'vue';

  import { DataLoading } from '@/components/base';
  import { PostHeader, PostsList } from '@/components/posts';

  import { getPosts } from '../services';

  const loading = ref(true);
  const posts = ref([]);

  const getAllPosts = async () => {
    const response = await getPosts();
    posts.value = response.data;
    loading.value = false;
  };

  getAllPosts();
</script>