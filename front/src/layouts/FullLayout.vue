<script setup>
import Header from '@/components/Full/Header.vue';
import HeaderResponsive from '@/components/Full/Responsive/HeaderResponsive.vue';
import Favorites from '@/components/Full/Favorites/Favorites.vue';
import PopUpSettings from '../components/Full/PopUpSettings.vue';
import PopUpLogin from '../components/Full/PopUpLogin.vue';
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '../stores/user';
import MenuResponsive from '../components/Full/Responsive/MenuResponsive.vue';
import { useRouter } from 'vue-router';
import Footer from '@/components/Full/Footer.vue';

const router = useRouter();

const userStore = useUserStore();

const showSettings = ref(false)
const closeSettings = ref(false)
const showFavorites = ref(false)
const closeFavorites = ref(false)
const showAccount = ref(false)
const closeMenuResponsive = ref(false)
const showMenuResponsive = ref(false)
const showPopPupLogin = computed(() => userStore.popUpLogin)


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
    showSettings.value = false;
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
  console.log(headerResponsive.value)
}

window.addEventListener('resize', checkHeaderResponsive)

function toggleMenu() {
  if(showMenuResponsive.value) {
    showMenuResponsive.value = false
    document.body.style.overflowY = 'auto'
    document.body.style.overflowX = 'hidden'
  }
  else {
    showMenuResponsive.value = !showMenuResponsive.value;
    document.body.style.overflowY = 'hidden'
    document.body.style.overflowX = 'hidden'
  }
}

function logout() {
  userStore.logout();
  showSettings.value = false;
  router.push('/login');
}

router.afterEach(() => {
  showMenuResponsive.value = false;
  showFavorites.value = false;
  showSettings.value = false;
})

onMounted(() => {
  checkHeaderResponsive()
})
</script>

<template>
  <main>
    <HeaderResponsive @toggle-cart="toggleCart" v-if="headerResponsive" @toggle-menu="toggleMenu"  @toggle-favorites="toggleFavorites"/>
    <Header @toggle-cart="toggleCart" @toggle-settings="toggleSettings" :links="links" v-else/>

    <MenuResponsive v-if="showMenuResponsive" :class="closeMenuResponsive != false ? 'closeMenuResponsive' : ''" @toggle-menu="toggleMenu" @logout="logout"/>

    <Favorites v-if="showFavorites" @close="toggleFavorites" :class="closeFavorites != false ? 'closeFavorites' : ''" class="favorites"/>

    <RouterView class="view"/>

    <PopUpSettings v-if="showSettings"  @toggle-favorites="toggleFavorites" @logout="logout" :class="closeSettings != false ? 'closeSettings' : ''"/>

    <PopUpLogin v-if="showPopPupLogin"/>
    
    <Footer/>
  </main>
</template>

<style scoped>
main {
  height: 100%;
}

.closeFavorites, .closeMenuResponsive {
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