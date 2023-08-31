<script setup>
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>

<template>
  <h1 class="font-bold text-center text-5xl text-yellow-500 md:text-8xl">{{ title }}</h1>
</template>