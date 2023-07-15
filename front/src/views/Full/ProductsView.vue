<script setup>
import Book from "../../components/Full/Book.vue";
import Pagination from "../../components/Full/Products/Pagination.vue";
import { useBookStore } from "@/stores/book.js";
import { useOthersStore } from "@/stores/others.js";
import { computed, ref } from "vue";

const bookStore = useBookStore();
const othersStore = useOthersStore();

const genres = computed(() => othersStore.genres);

const books = computed(() => bookStore.books);
const currentPage = ref(1);
const itemsPerPage = 12;

const displayedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return books.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  return Math.ceil(books.value.length / itemsPerPage);
});

const changePage = (page) => {
  currentPage.value = page;
};

function getBooksGenre() {
  let selectedGenres = [];
  genres.value.forEach(
    (genre) => {
      const checkbox = document.getElementById(`checkbox_genre${genre.id}`);

      if (checkbox.checked) {
        selectedGenres.push(genre.id);
      }
    }
  )
  console.log(selectedGenres)
  othersStore.getBooksGenre(selectedGenres);
}
</script>

<template>
  <main>
    <aside>
      <div @click="getBooksGenre">
        <h3>Filtrar por Generos</h3>
        <button>Filtrar</button>
      </div>
      <div>
        <span v-for="genre in genres" :key="genre.id" >
          <input type="checkbox" :id="`checkbox_genre${genre.id}`">
          <p>
            {{ genre.name }} ({{ genre.qntLivros }})
          </p>
        </span>
      </div>
    </aside>
    <section>
      <div class="books">
        <Book v-for="book in displayedItems" :key="book.id" :book="book" />
      </div>

      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="changePage"
      />
    </section>
  </main>
</template>

<style scoped>

main {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 1%;
    padding-left: 3%;
    gap: 65px;
}

aside {
    height: auto;
    width: 20%;
    border-radius: 10px;
    background-color: var(--cinza);
    padding: 1% .5% 1% 1% ;
    box-shadow: var(--primary-color) 0px 0px 5px;
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

aside div:nth-child(1) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1%;
}

aside div:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;
    overflow-y: scroll;
}

aside div:nth-child(2)::-webkit-scrollbar {
    width: 5px;
}

aside div:nth-child(2)::-webkit-scrollbar-track {
    background: transparent;
}

aside div:nth-child(2)::-webkit-scrollbar-thumb {
    background-color: var(--primary-color);
    border-radius: 2px;
}

aside div:nth-child(2) span {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}

section {
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.books {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
</style>
