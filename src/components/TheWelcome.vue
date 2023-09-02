<script setup>
  import PageHeader from '@base/PageHeader.vue';
  import PillButton from '@base/PillButton.vue';
</script>

<template>
  <div class="flex flex-col justify-center h-full">
    <PageHeader title="Welcome!" />
    <h1 class="font-bold mb-4 text-center text-3xl text-slate-100 md:text-5xl">The Waterbrook Quick Links</h1>

    <div class="grid grid-cols-1 lg:grid-cols-2">
      <router-link to="/notice-board">
        <PillButton class="w-full" text="Notice Board" />
      </router-link>
      <router-link to="/one-gospel">
        <PillButton class="w-full" text="One Gospel Registration" />
      </router-link>
    </div>
  </div>
</template>
