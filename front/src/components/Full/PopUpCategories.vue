<script setup>
import { ref, computed } from "vue";
import { useOthersStore } from '@/stores/others'
import { useBookStore } from '@/stores/book'
import router from "@/router";

const othersStore = useOthersStore();
const bookStore = useBookStore();

const genres = computed(()=> othersStore.genres)

async function goToGenre(genre) {
    const search = {
        text: String(genre.name),
    };
    console.log(search)
    await bookStore.getSearchBooks(search)
    router.push({name: 'busca', params: {search: genre.name}})
}

</script>

<template>
    <section>
        <div v-for="genre in genres">
            <p @click="goToGenre(genre)">
                {{ genre.name }}
            </p>
        </div>
    </section>
</template>

<style scoped>
    section {
        position: absolute;
        background-color: var(--background-color);
        top: 60px;
        width: 100%;
        height: 80px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        padding: 0.3% 2%;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 10px 0px;
    }

    section div p {
        font-size: 1.2rem;
        cursor: pointer;
    }
</style>