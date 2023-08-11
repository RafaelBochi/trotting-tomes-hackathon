<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import Search from "./Search.vue";
import { useUserStore} from "../../stores/user";



const activeRoute = ref(0);
const links = ['home', 'products', 'about'];
const router = useRouter();
const linkSizes = []; 
const userStore = useUserStore();

function animationBarStyle(index) {
  const width = linkSizes[activeRoute.value] || 0;
  const bar = document.querySelector('.animation-bar');
  bar.style.width = (width + 20) + 'px';
  bar.style.left = getLeftDifference(index) + 'px';
}

function getLeftDifference(index) {
    if (index == 0) {
        return -10
    }
    else {
    const bar = document.querySelector(`.animation-bar`).getBoundingClientRect()
    const link1 = document.querySelector(`#link${index}`).getBoundingClientRect()
    const link2 = document.querySelector(`#link${index - 1}`).getBoundingClientRect()
    const left1 = link1.left
    const left2 = link2.left
    const leftDifference = left1 - left2;
    console.log(left1) 
    return leftDifference;
    }
    
}

function setActiveLink(index) {
  const linkElement = document.querySelector(`#link${index}`);
  if (linkElement) {
    const rect = linkElement.getBoundingClientRect();
    const width = rect.width; // Largura do elemento
    const left = rect.left; // Posição horizontal em relação à viewport
    linkSizes[index] = width;
    activeRoute.value = index;
    animationBarStyle(index)
  }
}


function updateActiveRoute() {
    const currentRoute = router.currentRoute.value.name;
    activeRoute.value = currentRoute;
}

onMounted(
    () => {
        // setActiveLink(0)
        updateActiveRoute();
        router.afterEach(updateActiveRoute);
    }
) 
</script>

<template>
    <header>
        <div class="logo">
            <router-link to="/home">
                <a href="">
                    <p>
                        <img src="/logo-principal-green.png" alt="">
                    </p>
                </a>
            </router-link>
        </div>

        <div class="actions">
            <div class="links">
                <router-link 
                v-for="link, index in links"
                :to="`/${link}`"
                :key="link"
                :class="{ 'active-link': activeRoute === link }"
                :id="`link${index}`"
                @click="setActiveLink(index)" >
                    <a href="">
                        <p>
                            {{ link }}
                        </p>
                    </a>
                </router-link>
                <div class="animation-bar" :style="animationBarStyle"></div>
        </div>

        <Search/>

        <div class="auth">
            <router-link to="/login" v-if="userStore.loggedIn != true">
                <button>
                <font-awesome-icon :icon="['fas', 'user']" size="xl" style="color: #fff;" />
                
                <p>
                    Registrar-se
                </p>
                </button>
            </router-link>
            
            <div class="user" v-else>
                <img src="/userIcon.png" alt="" @click="userStore.logout">
                <span>
                    <p class="name">
                    {{ userStore.user.username }}
                </p>
                <p class="email">
                    {{ userStore.user.email }}
                </p>
                </span>
                
            </div>
        </div>

        <div class="carrinho" @click="$emit('toggleCart')">
                <font-awesome-icon :icon="['fas', 'shopping-cart']" size="2xl" style="color: var(--primary-color);" />
        </div>
        <div class="settings" @click="$emit('toggleSettings')">
                <font-awesome-icon :icon="['fas', 'gear']" size="2xl" style="color: var(--primary-color);" />
        </div>
        </div>

        
    </header>
</template>

<style scoped>
    header {
        background-color: #fff;
        width: 100%;
        height: 8vh;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0px 1px 20px -9px rgba(52,71,52,1);
        position: sticky;
        top: 0;
        z-index: 11;
        box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

    }

    .logo {
        width: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        left: 6%;
    }

    .logo img{
        width: 100%;
    }

    .actions {
        width: 70%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .links {
        position: relative;
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .links a {
        color: var(--secondary-color);
        text-decoration: none;
        font-size: 1.7rem;
        font-weight: bolder;
        transition: all .2s;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;
    }

    .active-link p {
        color: var(--primary-color);

    }

    .animation-bar  {
        width: 100px;
        height: 3px;
        left: calc(0px + 100px);
        background-color: var(--primary-color);
        position: absolute;
        bottom: 0;
        transition: .5s all;
    }

    

    .auth {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #000;
        font-size: 1.3rem;
    }
    .auth button {
        border: none;
        background-color: var(--lime-green);
        color: #fff;
        width: 150px;
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

    .auth .user {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    .auth .user .name {
        font-size: 1.2rem;
        font-weight: bolder;
    }
    .auth .user .email {
        font-size: 1rem;
        color: #00000090;
    }

    a {
        text-decoration: none;
    }

    .carrinho, .settings {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        right: 1%;
        cursor: pointer;
        transition: .5s;
    }

    .carrinho:hover {
        transform: scale(1.2);
    }

    .settings:hover {
        transform: scale(1.2) rotate(180deg);;  
        
    }
    .user img {
        width: 35px;
    }
</style>
