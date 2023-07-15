<script setup>
import { onMounted } from 'vue';
import { useBookStore } from '@/stores/book.js';
import { useOthersStore } from '@/stores/others.js';

const bookStore = useBookStore();
const othersStore = useOthersStore();
onMounted(
  () => {
    console.log("mounted")
    bookStore.getBooks();
    othersStore.getGenres();
  }
)
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
