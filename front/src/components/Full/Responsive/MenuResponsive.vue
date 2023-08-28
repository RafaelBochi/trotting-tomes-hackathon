<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router';
import { useUserStore } from "../../../stores/user";

const userStore = useUserStore();
const route = useRoute();

const activeRoute = ref();
const links = ["inicio", "catalogo", "sobre"];

function setActiveLink(link) {
    activeRoute.value = link;
}

onMounted(() => {
    setActiveLink(route.name);
})
</script>

<template>
    <div class="menu"> 
        <span class="close" @click="$emit('toggleMenu')">
            <font-awesome-icon :icon="['fas', 'xmark']" size="xl" />
        </span>
        <div class="links">
            <router-link v-for="(link, index) in links" :to="`/${link}`" :key="link"
                :id="activeRoute == link ? 'active-link' : 'noactive-link'" class="link" @click="setActiveLink(link)">
                <p>
                    {{ link }}
                </p>
            </router-link>
        </div>

        <div class="logout" @click="$emit('logout')" v-if="userStore.loggedIn">
            <p>
                Sair
            </p>
            <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']"  size="xl"/>
        </div>

    </div>
</template>

<style scoped>
.menu {
    max-width: 400px;
    min-width: 200px;
    width: 400px;
    height: calc(100% - 50px);
    background-color: #fff;
    position: fixed;
    left: calc(100% - 390px) !important;
    top: 50px;
    z-index: 10;
    padding: 1% 0;
    border-left: 6px solid var(--primary-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: openMenu forwards .5s;
}

@keyframes openMenu {
    0% {
        left: 100%;
    }

    100% {
        left: calc(100% - 400px) !important;
    }
}

.links {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 20px;
    font-size: 2.0rem;
    font-weight: 600;
    text-transform: uppercase;
    width: 100%;
}

.link {
    width: 90%;
    text-align: center;
    padding: 5px 0;
}

a {
    text-decoration: none;
    color: #999999;
}

#active-link {
    background-color: var(--primary-color);
    color: #fff !important;
    border-radius: 0px 10px 10px 0px;
    animation: activate forwards .5s;
}

@keyframes activate {
    0% {
        left: -100%;
    }

    100% {
        left: 0;
    }
}

.actions {
    position: absolute;
}

.close {
    position: absolute;
    right: 20px;
    top: 80px;
}

.logout {
    position: absolute;
    bottom: 30px;
    left: 120px;
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 1.5rem;
}
</style>