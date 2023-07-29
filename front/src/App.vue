<script setup>
import { onMounted } from 'vue';
import { useBookStore } from '@/stores/book.js';
import { useOthersStore } from '@/stores/others.js';
import { useUserStore } from './stores/user';

const bookStore = useBookStore();
const othersStore = useOthersStore();
const userStore = useUserStore();
onMounted(
  () => {
    console.log("mounted")
    bookStore.getBooks();
    othersStore.getGenres();
    othersStore.getAuthors();
    othersStore.getComents();

    if(userStore.loggedIn) {
      userStore.getFavorites();
      userStore.getCart()
      userStore.getBooksCart()
    }
    
  }
)
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
