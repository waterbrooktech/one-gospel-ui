<script setup>
  defineProps({
    message: String,
    title: String,
  })
</script>

<template>
  <div class="bg-yellow-500 max-w-xs shadow-slate-600 shadow-md p-4 md:p-6">
    <h3 class="font-bold text-2xl text-center mb-4 text-slate-100 md:text-3xl">{{ title  }}</h3>
    <p class="text-slate-100 text-md md:text-lg">{{ message  }}</p>
  </div>
</template>