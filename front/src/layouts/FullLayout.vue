<script setup>
import Header from '@/components/Full/Header.vue';
import Cart from '@/components/Full/Cart/Cart.vue';
import Favorites from '@/components/Full/Favorites/Favorites.vue';
import PopUpSettings from '../components/Full/PopUpSettings.vue';
import { ref } from 'vue';
import { useUserStore } from '../stores/user';

const userStore = useUserStore();

const showCart = ref(false)
const closeCart = ref(false)
const showSettings = ref(false)
const closeSettings = ref(false)
const showFavorites = ref(false)
const closeFavorites = ref(false)


function toggleSettings() {
  if(showSettings.value) {
    closeSettings.value = true
    setTimeout(() => {
      closeSettings.value = false
      showSettings.value = !showSettings.value
    }, 500)
  }
  else {
    showSettings.value = !showSettings.value;
  }
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
    showFavorites.value = !showFavorites.value;
    toggleSettings();
    if(showCart.value) {
      toggleCart();
    }
  }
  
}

function toggleCart() {
  if(showCart.value) {
    closeCart.value = true
    setTimeout(() => {
      closeCart.value = false
      showCart.value = !showCart.value
    }, 500)
  }
  else {
    if(showFavorites.value) {
      toggleFavorites();
    }
    showCart.value = !showCart.value;
  }
  
}
</script>

<template>
  <main>
    <Header @toggle-cart="toggleCart" @toggle-settings="toggleSettings" />
    <Cart v-if="showCart" @close="toggleCart" :class="closeCart != false ? 'closeCart' : ''"/>
    <Favorites v-if="showFavorites" @close="toggleFavorites" :class="closeFavorites != false ? 'closeFavorites' : ''"/>
    <RouterView/>
    <PopUpSettings v-if="showSettings"  @toggle-favorites="toggleFavorites" @logout="userStore.logout" :class="closeSettings != false ? 'closeSettings' : ''"/>
  </main>
</template>

<style scoped>

.closeFavorites, .closeCart {
  animation: closeSections .5s forwards;
}

@keyframes closeSections {
  0% {
    right: 0;
  }
  100% {
    right: -30%;
  }
}

.closeSettings {
  animation: closeSettings .5s forwards;
}

@keyframes closeSettings {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>