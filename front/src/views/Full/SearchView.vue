<script setup>
import { computed, onMounted, onBeforeUpdate } from 'vue';
import { useBookStore } from '@/stores/book';
import Book from '@/components/Full/Book/Book.vue';

const props = defineProps({
    search: {
        type: String,
        required: true,
    },
});

const bookStore = useBookStore();

const searchBooks = computed(() => bookStore.searchBooks);

const recommendedBooks = computed(() => bookStore.books.sort(() => Math.random() - 0.5).slice(0, 10));



</script>

<template>
    <main>
        <h1>{{ searchBooks.length }} livros de "{{ props.search }}" encontrados...</h1>


        <div class="searchBooks" :class="searchBooks.length > 5 ? 'centerBooks' : ''">
            <Book v-for="book in searchBooks" :key="book.id" :book="book" />
        </div>

        <div class="recommendedBooks" v-if="searchBooks.length < 5">
            <h2>Recomendados para você</h2>
            <div class="books">
                <Book v-for="book in recommendedBooks" :key="book.id" :book="book" />
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 2% 2% 4% 2%;
    gap: 20px;
}

h1 {
    font-size: 2rem;
    font-weight: bolder;
    text-transform: uppercase;
    color: var(--primary-color);
}

.searchBooks {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
}

.centerBooks {
    justify-content: center;
}

.recommendedBooks {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    height: 600px;
    margin-top: 60px;
}

.recommendedBooks::before {
    content: '';
    width: 100%;
    height: 1px;
    background-color: #00000069;
}

.recommendedBooks h2 {
    font-size: 1.5rem;
    font-weight: bolder;
    text-transform: uppercase;
    color: var(--primary-color);
}

.recommendedBooks .books {
    width: 100%;
    height: 500px;
    display: flex;
    gap: 50px;
    overflow-x: auto;
}
</style>