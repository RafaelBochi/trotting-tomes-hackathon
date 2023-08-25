<script setup>
import Header from '@/components/Full/Header.vue';
import HeaderResponsive from '@/components/Full/Responsive/HeaderResponsive.vue'
import Cart from '@/components/Full/Cart/Cart.vue';
import Favorites from '@/components/Full/Favorites/Favorites.vue';
import PopUpSettings from '../components/Full/PopUpSettings.vue';
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/user';
import MenuResponsive from '../components/Full/Responsive/MenuResponsive.vue';

const userStore = useUserStore();

const showCart = ref(false)
const closeCart = ref(false)
const showSettings = ref(false)
const closeSettings = ref(false)
const showFavorites = ref(false)
const closeFavorites = ref(false)
const showAccount = ref(false)
const closeMenuResponsive = ref(false)
const showMenuResponsive = ref(false)
const links = ['home', 'products', 'about']


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

const headerResponsive = ref(false)

function checkHeaderResponsive() {
  if(window.innerWidth <= 1100) {
    headerResponsive.value = true
  }
  else {
    headerResponsive.value = false
  }
}

window.addEventListener('resize', checkHeaderResponsive)

function toggleMenu() {
  if(showMenuResponsive.value) {
    showMenuResponsive.value = false
  }
  else {
    showMenuResponsive.value = !showMenuResponsive.value;
  }
}

onMounted(() => {
  checkHeaderResponsive()
})
</script>

<template>
  <main>
    <HeaderResponsive @toggle-cart="toggleCart" v-if="headerResponsive" @toggle-menu="toggleMenu"/>

    <Header @toggle-cart="toggleCart" @toggle-settings="toggleSettings" :links="links" v-else/>

    <Cart v-if="showCart" @close="toggleCart" :class="closeCart != false ? 'closeCart' : ''" class="cart"/>

    <Favorites v-if="showFavorites" @close="toggleFavorites" :class="closeFavorites != false ? 'closeFavorites' : ''" class="favorites"/>

    <RouterView class="view"/>

    <PopUpSettings v-if="showSettings"  @toggle-favorites="toggleFavorites" @logout="userStore.logout" :class="closeSettings != false ? 'closeSettings' : ''"/>


    <MenuResponsive v-if="showMenuResponsive" :class="closeMenuResponsive != false ? 'closeMenuResponsive' : ''" @toggle-menu="toggleMenu"/>
  </main>
</template>

<style scoped>

.closeFavorites, .closeCart, .closeMenuResponsive {
  animation: closeSections .5s forwards;
}

@keyframes closeSections {
  0% {
    right: 0;
  }
  100% {
    right: -400px;
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

@media screen and (max-width: 620px) {
  .view {
    padding-top: 60px;
  }
}
</style>