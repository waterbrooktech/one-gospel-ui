<script setup>
  import CentersListItem from './CentersListItem.vue';

  defineProps({
    centers: Array
  })
</script>


<template>
  <div class="flex flex-col justify-center items-center pb-4 gap-10 md:gap-16 md:flex-row md:flex-wrap">
    <centers-list-item v-for="center in centers" :key="center.area" :area="center.area" :available-spots="center.availableSpots" @click="$emit('onSelect', center)" />
  </div>
</template>