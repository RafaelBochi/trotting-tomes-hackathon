<script setup>
import { ref, computed, onMounted } from "vue";
import Search from "./Search.vue";
import PopUpCategories from "./PopUpCategories.vue";
import { useUserStore } from "../../stores/user";
import { useCartStore } from "@/stores/cart";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const cartStore = useCartStore();

const sizeBooksCart = computed(() => cartStore.booksCart.length);

const showPopUpCategories = ref(false);

function toggleShowPopUpCategories() {
  showPopUpCategories.value = !showPopUpCategories.value;
}

const router = useRouter();
const links = [{ name: 'início', path: 'inicio' }, { name: 'catálogo', path: 'catalogo' }];
const linksDiv = ref();
const currentRoute = computed(() => router.currentRoute.value.path.split('/')[1]);
const activeLink = ref(currentRoute.value);
const headerBar = ref();

function getActiveLinkProperties(index) {
  console.log(index)
  if(index == -1) return { activeLinkPostion: 0, activeLinkWidth: 0, index: -1 };
  const activeLinkPostion = linksDiv.value[index].offsetLeft;
  const activeLinkWidth = linksDiv.value[index].offsetWidth;
  return { activeLinkPostion, activeLinkWidth, index };
}

function setHeaderBarProperties(position, width, index) {
  if(index == -1) {
    headerBar.value.style.left = `0px`;
    headerBar.value.style.width = `0px`;
    return;
  };
  headerBar.value.style.left = `${position - 10}px`;
  headerBar.value.style.width = `${width + 20}px`;
}

function setActiveLink(path, index) {
  activeLink.value = path;
  setHeaderBarProperties(...Object.values(getActiveLinkProperties(index)));
}

onMounted(() => {
  setActiveLink(currentRoute.value, links.findIndex(link => link.path == currentRoute.value))
})

window.addEventListener("resize", () => {
  setActiveLink(currentRoute.value, links.findIndex(link => link.path == currentRoute.value))
});

router.afterEach(() => {
  showPopUpCategories.value = false;
  console.log(links.findIndex(link => link.path == currentRoute.value))
  setActiveLink(currentRoute.value, links.findIndex(link => link.path == currentRoute.value))
})
</script>

<template>
  <header>
    <div class="logo">
      <router-link to="/inicio">
        <a href="">
          <p>
            <img src="/logo-principal-green.png" alt="" />
          </p>
        </a>
      </router-link>
    </div>

    <div class="links">
      <router-link v-for="(link, index) in links" :to="`/${link.path}`" :key="link"
        :class="{ 'active-link': activeLink == link.path }" @click="setActiveLink(link.path, index)">
        <a href="" ref="linksDiv">
          <p>
            {{ link.name }}
          </p>
        </a>
      </router-link>
      <a @click="toggleShowPopUpCategories" :class="showPopUpCategories ? 'active' : ''">
        <p>
          Categorias
        </p>
        <font-awesome-icon :icon="['fas', 'chevron-up']" v-if="showPopUpCategories" class="icon" />
        <font-awesome-icon :icon="['fas', 'chevron-down']" v-else class="icon" />

      </a>
      <div class="animation-bar" ref="headerBar"></div>
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

      <router-link to="/carrinho">
        <div class="carrinho" @click="$emit('toggleCart')" v-if="userStore.loggedIn == true">
          <font-awesome-icon :icon="['fas', 'shopping-cart']" size="2xl" style="color: var(--primary-color)" />
          <p>{{ sizeBooksCart }}</p>
        </div>
      </router-link>

      <div class="settings" @click="$emit('toggleSettings')" v-if="userStore.loggedIn == true">
        <font-awesome-icon :icon="['fas', 'gear']" size="2xl" style="color: var(--primary-color)" class="icon" />
      </div>
    </div>

    <PopUpCategories v-if="showPopUpCategories" />
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

.active p {
  color: var(--primary-color) !important;
}

.active .icon {
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

.settings:hover>.icon {
  transform: scale(1.2) rotate(180deg);
}
</style>
