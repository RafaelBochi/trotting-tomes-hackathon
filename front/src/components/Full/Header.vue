<script setup>
import { ref, onMounted, computed, onBeforeUpdate } from "vue";
import { useRouter } from "vue-router";
import Search from "./Search.vue";
import PopUpCategories from "./PopUpCategories.vue";
import { useUserStore } from "../../stores/user";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cart";

const route = useRoute();
const router = useRouter();
const activeRoute = ref();
const links = ["inicio", "catalogo"];
const linkSizes = [];
const activeLink = ref(0);
const userStore = useUserStore();
const cartStore = useCartStore();

const sizeBooksCart = computed(()=> cartStore.booksCart.length);

function animationBarStyle(index) {
  const width = linkSizes[activeLink.value] || 0;
  const bar = document.querySelector(".animation-bar");
  bar.style.width = width + 20 + "px";
  bar.style.left = getLeftDifference(index) + "px";
}

function getLeftDifference(index) {
  const link1 = document.querySelector(`#link${index}`).getBoundingClientRect();
  if (index == 0) {
    return link1.left - 10;
  }
  const link2 = document
    .querySelector(`#link${index - 1}`)
    .getBoundingClientRect();
  const left1 = link1.left;
  const left2 = link2.left;
  const leftDifference = left1 - left2;
  return left1 - 10;
}

function setActiveLink(index) {
  activeLink.value = index;
  const linkElement = document.querySelector(`#link${index}`);
  if (linkElement) {
    const rect = linkElement.getBoundingClientRect();
    const width = rect.width; // Largura do elemento
    const left = rect.left; // Posição horizontal em relação à viewport
    linkSizes[index] = width;
    animationBarStyle(index);
  }
}

function updateActiveRoute(to) {
  activeRoute.value = to.name;
  if (!links.includes(activeRoute.value)) {
    const bar = document.querySelector(".animation-bar");
    bar.style.width = 0;
  }
  else {
    setActiveLink(links.indexOf(activeRoute.value));
  }
}

window.addEventListener("resize", () => {
  setActiveLink(activeLink.value);
});

router.afterEach((to) => {
  if(to.name == "sobre") {
    activeRoute.value = "sobre"
    return;
  }

  updateActiveRoute(to);
  window.location.reload()

});

const showPopUpCategories = ref(false)

function toggleShowPopUpCategories() {
  showPopUpCategories.value = !showPopUpCategories.value;

}

onMounted(() => {
  setActiveLink(activeLink.value);
  updateActiveRoute(route);
});


</script>

<template>
  <header>
    <div class="logo">
      <router-link to="/home">
        <a href="">
          <p>
            <img src="/logo-principal-green.png" alt="" />
          </p>
        </a>
      </router-link>
    </div>

    <div class="links">
      <router-link v-for="(link, index) in links" :to="`/${link}`" :key="link"
        :class="{ 'active-link': activeRoute == link }" :id="`link${index}`" @click="setActiveLink(index)">
        <a href="">
          <p>
            {{ link }}
          </p>
        </a>
      </router-link>
      <a @click="toggleShowPopUpCategories" :class="showPopUpCategories ? 'active' : ''">
        <p>
          Categorias
        </p>
        <font-awesome-icon :icon="['fas', 'chevron-up']" v-if="showPopUpCategories" class="icon"/>
        <font-awesome-icon :icon="['fas', 'chevron-down']" v-else class="icon"/>

      </a>
      <div class="animation-bar" :style="animationBarStyle"></div>
    </div>

    <div class="actions">
      <Search />

      <div class="auth" v-if="userStore.loggedIn != true">
        <router-link to="/login">
          <button>
            <font-awesome-icon :icon="['fas', 'user']" size="xl" style="color: #fff" />

            <p>Entrar</p>
          </button>
        </router-link>
      </div>

      <div class="userInfo" v-else>
        <!-- <img src="/userIcon.png" alt="Icone Usuario"> -->
        <div>
          <p class="name">
            {{ userStore.user.username }}
          </p>

          <p class="email">
            {{ userStore.user.email }}
          </p>
        </div>
      </div>

      <div class="carrinho" @click="$emit('toggleCart')" v-if="userStore.loggedIn == true">
        <font-awesome-icon :icon="['fas', 'shopping-cart']" size="2xl" style="color: var(--primary-color)" />
        <p>{{ sizeBooksCart }}</p>
      </div>
      <div class="settings" @click="$emit('toggleSettings')" v-if="userStore.loggedIn == true">
        <font-awesome-icon :icon="['fas', 'gear']" size="2xl" style="color: var(--primary-color)" class="icon"/>
      </div>
    </div>

    <PopUpCategories v-if="showPopUpCategories"/>
  </header>
</template>

<style scoped>
header {
  background-color: #fff;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0px 1px 20px -9px rgba(52, 71, 52, 1);
  position: sticky;
  top: -2px;
  z-index: 11;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.logo {
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.logo img {
  width: 100%;
}

.links {
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.links a {
  color: var(--secondary-color);
  text-decoration: none;
  font-size: 1.7rem;
  font-weight: bolder;
  transition: all 0.2s;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  gap: 10px;
  cursor: pointer;
}

.active-link p {
  color: var(--primary-color);
}

.active p{
  color: var(--primary-color) !important;
}

.active .icon{
  color: var(--primary-color) !important;
}

.animation-bar {
  height: 3px;
  background-color: var(--primary-color);
  position: absolute;
  bottom: 15px;
  transition: 0.5s all;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 600px;
  min-width: 400px;
  gap: 20px;
}

.auth {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-size: 1.3rem;
  width: 15%;
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

.userInfo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.userInfo img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
}

.userInfo .name {
  white-space: nowrap;
  /* Impede que o texto seja quebrado em várias linhas */
  overflow: hidden;
  /* Oculta o conteúdo que excede o contêiner */
  text-overflow: ellipsis;
  font-size: 1.2rem;
  font-weight: bolder;
  text-transform: uppercase;
  color: var(--primary-color);
  width: 150px;
}

.userInfo .email {
  white-space: nowrap;
  /* Impede que o texto seja quebrado em várias linhas */
  overflow: hidden;
  /* Oculta o conteúdo que excede o contêiner */
  text-overflow: ellipsis;
  width: 150px;
}

.carrinho,
.settings {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.5s;
  padding-right: 10px;
}

.carrinho p {
  position: absolute;
  top: -10px;
  right: 2px;
  background-color: var(--primary-color);
  color: #fff;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  text-align: center;
}

.settings .icon {
  transition: 0.5s all;
}

.settings:hover > .icon {
  transform: scale(1.2) rotate(180deg);
}
</style>
