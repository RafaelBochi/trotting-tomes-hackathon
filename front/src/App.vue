<script setup>
import { onMounted, onBeforeMount, computed } from 'vue';
import { useBookStore } from '@/stores/book.js';
import { useOthersStore } from '@/stores/others.js';
import { useUserStore } from './stores/user';
import { useGlobalStore } from './stores/global';
import { useFavoriteStore } from './stores/favorite';
import { useCartStore } from './stores/cart';
import MessageModalVue from './components/MessageModal.vue';
import PreLoaderVue from './components/PreLoader.vue';

const bookStore = useBookStore();
const othersStore = useOthersStore();
const userStore = useUserStore();
const globalStore = useGlobalStore();
const favoriteStore = useFavoriteStore();
const cartStore = useCartStore();

const showPreloader = computed(() => globalStore.showPreloader);

onBeforeMount(
  async () => {
    globalStore.showPreloader = true;
    await bookStore.getBooks();
    await othersStore.getGenres();
    await othersStore.getAuthors();
    await othersStore.getComents();

    if (userStore.loggedIn) {
      await favoriteStore.getFavorites();
      await cartStore.getCart()
      await cartStore.getBooksCart()
    }
    globalStore.showPreloader = false;
  }
)
</script>

<template>
  <div>
    <PreLoaderVue v-if="showPreloader" />
    <MessageModalVue />
    <RouterView />
  </div>
</template>

<style scoped>
</style>
