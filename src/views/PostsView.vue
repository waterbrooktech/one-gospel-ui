<template>
  <main class="p-10 lg:h-screen">
    <PostHeader class="mb-20" />
    <div v-if="loading" class="w-full flex justify-center p-20">
      <DataLoading />
    </div>
    <PostsList v-else-if="!loading && posts.length > 0" :posts="posts" />
    <div v-else class="w-full p-4 md:p-10 text-center">
      <p class="mx-auto text-xl text-slate-100 max-w-lg">There is no new notification at this time, please check back later or leave your details and we'll get back to you.</p>
    </div>
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