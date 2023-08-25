<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router';

const route = useRoute();

const activeRoute = ref();
const links = ["home", "products", "about"];

function setActiveLink(link) {
    activeRoute.value = link;
}

onMounted(() => {
    setActiveLink(route.name);
})
</script>

<template>
    <aside>
        <span class="close" @click="$emit('toggleMenu')">
            <font-awesome-icon :icon="['fas', 'xmark']" size="xl"/>
        </span>
        <div class="links">
        <router-link
          v-for="(link, index) in links"
          :to="`/${link}`"
          :key="link"
          :id="activeRoute == link ? 'active-link' : 'noactive-link'"
          class="link"
          @click="setActiveLink(link)"
        >
            <p>
              {{ link }}
            </p>
        </router-link>
        </div>

        <div class="actions">

        </div>
    </aside>
</template>

<style scoped>
aside {
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
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
        left: 0;
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
    top: 130px;
}
</style>