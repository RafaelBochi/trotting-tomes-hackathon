<script setup>
import { ref, computed } from "vue";
import { useBookStore } from "@/stores/book.js";
import Book from "@/components/Full/Book/Book.vue";
import Pagination from "@/components/Full/Home/Pagination.vue";

const bookStore = useBookStore();

const books = computed(() => bookStore.books);

const currentPage = ref(1);
const itemsPerPage = 5;

const startIndex = ref(0);
const endIndex = ref(5);


const displayedItems = computed(() => {
  return books.value.slice(startIndex.value, endIndex.value);
});

const totalPages = computed(() => {
  return Math.ceil(books.value.length / itemsPerPage);
});

const changePage = (page) => {
  currentPage.value = page;
  startIndex.value = (page - 1) * itemsPerPage;
  endIndex.value = page * itemsPerPage;
};

const nextBook = () => {
  if (currentPage.value < totalPages.value) {
      endIndex.value += 1;
      startIndex.value += 1;

      if (endIndex.value % itemsPerPage == 0) {
        currentPage.value = endIndex.value / itemsPerPage;
      }

  }
};

const previousBook = () => {
  if (currentPage.value > 1) {
      endIndex.value -= 1;
      startIndex.value -= 1;

      if (endIndex.value % itemsPerPage == 0) {
        currentPage.value = endIndex.value / itemsPerPage;
      }

    }
};
</script>

<template>
  <section>
      <div class="books">
        <Book v-for="book in displayedItems" :key="book.id" :book="book" />
      </div>

    <div class="pages">
      <span
        v-for="(page, index) in totalPages"
        :key="index"
        :class="currentPage == page ? 'activate' : ''"
        class="page"
        @click="changePage(page)"
      >
      </span>
    </div>

    <Pagination
      :start-index="startIndex"
      :end-index="endIndex"
      @next-book="nextBook"
      :books="books"
      @previous-book="previousBook"
    />
  </section>
</template>

<style scoped>
section {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
}

.books {
  padding-top: 2%;
  display: flex;
  margin: auto;
  width: 100%;
  height: 400px;
  align-items: center;
  justify-content: center;
  gap: 20px;
  overflow: hidden;
}

.pages {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.page {
  border: 1px solid var(--primary-color);
  width: 10px;
  height: 10px;
  border-radius: 100%;
  cursor: pointer;
}

.activate {
  background-color: var(--primary-color);
}


</style>
