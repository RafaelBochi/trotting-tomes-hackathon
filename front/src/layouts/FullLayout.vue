<script setup>
import Header from '@/components/Full/Header.vue';
import Cart from '@/components/Full/Cart/Cart.vue';
import Favorites from '@/components/Full/Favorites/Favorites.vue';
import PopUpSettings from '../components/Full/PopUpSettings.vue';
import { ref } from 'vue';

const showCart = ref(false)
const showSettings = ref(false)
const showFavorites = ref(false)
const closeFavorites = ref(false)

function toggleCart() {
  showCart.value = !showCart.value;
}

function toggleSettings() {
  showSettings.value = !showSettings.value;
}

function toggleFavorites() {
  if(showFavorites.value) {
    closeFavorites.value = true
    setTimeout(() => {
      closeFavorites.value = false
      showFavorites.value = !showFavorites.value
    }, 500)
  }
  else {
    toggleSettings();
    showFavorites.value = !showFavorites.value;
  }
  
}
</script>

<template>
  <main>
    <Header @toggle-cart="toggleCart" @toggle-settings="toggleSettings"/>
    <Cart v-if="showCart"/>
    <Favorites v-if="showFavorites" @close="toggleFavorites" :class="closeFavorites != false ? 'closeFavorites' : ''"/>
    <RouterView/>
    <PopUpSettings v-if="showSettings"  @toggle-favorites="toggleFavorites"/>
  </main>
</template>

<style scoped>

.closeFavorites {
  animation: closeFavorites .5s forwards;
}

@keyframes closeFavorites {
  0% {
    right: 0;
  }
  100% {
    right: -30%;
  }
}
</style>