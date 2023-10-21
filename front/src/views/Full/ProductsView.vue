<script setup>
import Book from "@/components/Full/Book/Book.vue";
import Pagination from "@/components/Full/Products/Pagination.vue";
import { useBookStore } from "@/stores/book.js";
import { useOthersStore } from "@/stores/others.js";
import { computed, ref } from "vue";
import Filter from "@/components/Full/Products/Filter.vue";

const bookStore = useBookStore();
const othersStore = useOthersStore();

const books = computed(() => bookStore.books);
const currentPage = ref(1);
const itemsPerPage = 16;

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
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
  <main>
      <Filter @page-change="changePage"/>

      <div class="books" v-if="displayedItems.length > 0">
        <Book v-for="book in displayedItems" :key="book.id" :book="book" />
      </div>

      <div class="emptyBooks" v-else>
        <h1>Nenhum livro encontrado</h1>
      </div>

      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="changePage"
      />
  </main>
</template>

<style scoped>

main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 1%;
}

.books {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 50px;
    margin-top: 40px;
}

.emptyBooks {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
}
</style>
