<script setup>
  defineProps({
    area: String,
    availableSpots: Number,
  })
</script>

<template>
  <div class="flex flex-col justify-center items-center bg-yellow-500 w-60 h-60 shadow-slate-600 shadow-md p-4 rounded-full cursor-pointer md:p-6 transition-transform ease-in duration-100 hover:scale-110">
    <h3 class="font-bold text-2xl text-center mb-4 text-slate-100 md:text-3xl uppercase">{{ area  }}</h3>
    <p class="text-slate-100 text-md md:text-lg">Available Spots:</p>
    <p class="font-bold text-slate-100 text-2xl">{{ availableSpots  }}</p>
  </div>
</template>