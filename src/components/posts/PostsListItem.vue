<script setup>
  defineProps({
    link: String,
    message: String,
    title: String,
  })
</script>

<template>
  <div class="bg-yellow-300 max-w-xs shadow-slate-600 shadow-md p-4 md:p-6">
    <h3 class="font-bold text-2xl mb-4 text-black md:text-3xl">{{ title  }}</h3>
    <p class="text-slate-900 mb-2 text-md md:text-lg">{{ message  }}</p>
    <a v-if="link" class="text-black inline-block underline transform duration-75 hover:bg-transparent hover:scale-110 hover:rotate-3" :href="link" target="_blank">Click Here</a>
  </div>
</template>
