
<template>
  <button
    class="bg-yellow-500 border border-slate-900 font-bold p-5 text-3xl text-slate-100 hover:bg-black hover:text-white">
    {{text}}
  </button>
</template>

<script setup>
  defineProps({
    text: {
      required: true,
      type: String
    }
  });
</script>