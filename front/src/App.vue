<script setup>
import { onMounted, onBeforeMount, computed } from 'vue';
import { useBookStore } from '@/stores/book.js';
import { useOthersStore } from '@/stores/others.js';
import { useUserStore } from './stores/user';
import { useGlobalStore } from './stores/global';
import MessageModalVue from './components/MessageModal.vue';
import PreLoaderVue from './components/PreLoader.vue';

const bookStore = useBookStore();
const othersStore = useOthersStore();
const userStore = useUserStore();
const globalStore = useGlobalStore();

const showPreloader = computed(() => globalStore.showPreloader);

onBeforeMount(
  async () => {
    showPreloader.value = true;
    await bookStore.getBooks();
    await othersStore.getGenres();
    await othersStore.getAuthors();
    await othersStore.getComents();

    if(userStore.loggedIn) {
      await userStore.getFavorites();
      await userStore.getCart()
      await userStore.getBooksCart()
    }
    showPreloader.value = false;
  }
)
</script>

<template>
    <PreLoaderVue v-if="showPreloader"/>
    <MessageModalVue />
    <RouterView />
</template>

<style scoped>
</style>
