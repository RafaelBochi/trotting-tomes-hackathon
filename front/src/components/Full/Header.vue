<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Search from "./Search.vue";
import { useUserStore} from "../../stores/user";

const activeRoute = ref(null);
const router = useRouter();

const userStore = useUserStore();

function updateActiveRoute() {
    const currentRoute = router.currentRoute.value.name;
    activeRoute.value = currentRoute;
}

onMounted(
    () => {
        updateActiveRoute();
        router.afterEach(updateActiveRoute);
    }
) 
</script>

<template>
    <header>
        <div class="logo">
            <img src="/logo-principal-green.png" alt="">
        </div>

        <div class="actions">
            <div class="links">
                <router-link to="/" :class="{ 'active-link': activeRoute === 'home' }">
                    <a href="">
                        <p>
                            HOME
                        </p>
                    </a>
                </router-link>
                <router-link to="/products" :class="{ 'active-link': activeRoute === 'products' }">
                    <a href="">
                        <p>
                            PRODUTOS
                        </p>
                    </a>
                </router-link>
                <router-link to="/sobre">
                    <a href="">
                        <p>
                            SOBRE
                        </p>
                    </a>
                </router-link>
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
        height: 8%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0px 1px 20px -9px rgba(52,71,52,1);
        position: sticky;
        top: 0;
        z-index: 11;
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
    }

    .active-link p {
        color: var(--primary-color);

    }

    .active-link::after {
        content: '';
        width: 120%;
        height: 3px;
        background: var(--primary-color);
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
