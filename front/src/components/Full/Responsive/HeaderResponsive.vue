<script setup>
import SearchResponsive from './SearchResponsive.vue';
import { ref } from 'vue';
import { useUserStore } from '../../../stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const router = useRouter();
const windowWidth = ref(window.innerWidth);

const showLogoMini = ref(false);

window.addEventListener('resize', ()=> {
  windowWidth.value = window.innerWidth;
  if(windowWidth.value < 740) {
    showLogoMini.value = true;
  }
  if (windowWidth.value < 620) {
    showLogoMini.value = false;
  }
  if (windowWidth.value < 350) {
    showLogoMini.value = true;
  }
})
</script>

<template>
    <header>
        <div class="logo">
      <router-link to="/">
        <a href="">
          <p>
            <img src="/logo-mini.png" alt="" class="imgMini" v-if="showLogoMini"/>
            <img src="/logo-principal-green.png" alt="" class="imgClassic" v-else>
          </p>
        </a>
      </router-link>
    </div>

    <div class="actions">

    <SearchResponsive class="searchResponsive"/>

    <div class="auth"  v-if="userStore.loggedIn != true">
        <router-link to="/login">
          <button>
            <font-awesome-icon
              :icon="['fas', 'user']"
              size="xl"
              style="color: #fff"
            />

            <p>Entrar</p>
          </button>
        </router-link>
      </div>
        <div class="carrinho" @click="router.push('/carrinho')" v-if="userStore.loggedIn">
        <font-awesome-icon
          :icon="['fas', 'shopping-cart']"
          size="2xl"
          style="color: var(--primary-color)"
        />
        </div>   
        <div class="favorites" @click="$emit('toggleFavorites')" v-if="userStore.loggedIn">
            <font-awesome-icon :icon="['fas', 'heart']" style="color: var(--primary-color);" size="2xl"/>
        </div>
        <div class="menu" @click="$emit('toggleMenu')">
            <font-awesome-icon :icon="['fas', 'bars']" size="2xl" style="color: var(--primary-color)"/>
        </div> 
    </div>
    </header>
</template>

<style scoped>
header {
  position: relative;
  background-color: #fff;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 1px 20px -9px rgba(52, 71, 52, 1);
  position: sticky;
  top: -4px;
  z-index: 11;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.logo {
  position: absolute;
  width: 40px;
  min-width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 2%;
}

.logo .imgMini {
  width: 100%;
  min-width: 30px;
}

.logo .imgClassic {
  width: 130px;
  position: relative;
  left: 40px;
}

.auth {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-size: 1.3rem;
  width: 15%;
  margin: 0 20px;
}
.auth button {
  border: none;
  background-color: var(--lime-green);
  color: #fff;
  width: 100%;
  height: 35px;
  padding: 0.7rem 2rem;
  border-radius: 5px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
}

.auth button p {
  font-size: 1.2rem;
  font-weight: bolder;
  text-align: center;
  text-transform: none;
}

a {
  text-decoration: none;
}

.actions {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding-right: 4%;
}

.menu {
  cursor: pointer;
}

.carrinho {
  cursor: pointer;
}

@media screen and (max-width: 620px) {
  .actions {
    width: 200px;
    justify-content: space-evenly;
  }
} 

</style>
