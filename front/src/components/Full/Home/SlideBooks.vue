<script setup>
import { ref, computed, onMounted } from "vue";
import { useBookStore } from "@/stores/book.js";
import Book from "@/components/Full/Book/Book.vue";
import Pagination from "@/components/Full/Home/Pagination.vue";


const rand=()=>Math.random(0).toString(36).substr(2);
const token=(length)=>(rand()+rand()+rand()+rand()).substr(0,length);

const bookStore = useBookStore();

const props = defineProps({
  slideNum: {
    type: Number,
  },
});

// const books = computed(() => bookStore.books);
// const sortedBooks = computed(() => books.value.sort( () => .5 - Math.random()))

const randomParam = Math.random(10)

const sortedBooks = computed(() => bookStore.sortedBooks(randomParam))

const active = ref(0);
const slideNum = token(10);
const currentPage = ref(1);
const itemsPerPage = ref(3);

const totalPages = computed(() => {
  return Math.ceil(sortedBooks.value.length / itemsPerPage.value);
});

const changePage = (page) => {
  const items = document.querySelectorAll(`.books.books${slideNum} > *`);
  currentPage.value = page;
  console.log(page);
  if (page == 1) {
    active.value = 0;
    items[0].scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
    return;
  }

  active.value = (page - 1) * itemsPerPage.value;

  if (itemsPerPage.value % 2 == 0) {
    items[active.value].scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
    return;
  }

  items[active.value + 1].scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "nearest",
  });
};

const nextBook = () => {
  const items = document.querySelectorAll(`.books.books${slideNum} > *`);
  if (currentPage.value < totalPages.value) {
    console.log(itemsPerPage.value);
    active.value++;
    if (itemsPerPage.value <= 1) {
      items[active.value].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    } else {
      items[active.value + 1].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
    if (active.value % itemsPerPage.value == 0) {
      currentPage.value = active.value / itemsPerPage.value + 1;
    }
  }
};

const previousBook = () => {
  const items = document.querySelectorAll(`.books.books${slideNum} > *`);
  if (active.value == 0) {
    console.log(items[0]);
    items[0].scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  }
  if (currentPage.value > 0) {
    active.value--;

    items[active.value].scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
    if ((active.value + 1) % itemsPerPage.value == 0) {
      currentPage.value--;
    }
  }
};

let widthSecBooks;

function getWidthSecBooks() {
  const items = document.querySelectorAll(`.books.books${slideNum} > *`);
  const secBooks = document.querySelector(`.books${slideNum}`);
  if (secBooks) {
    widthSecBooks = secBooks.getBoundingClientRect().width;
  }

  itemsPerPage.value = Math.floor(widthSecBooks / 300);

  if (itemsPerPage.value > 3) {
    itemsPerPage.value = 3;
  }
}

window.addEventListener("resize", getWidthSecBooks);

onMounted(() => {
  console.log('mounted')
  getWidthSecBooks();
});
</script>

<template>
  <section>
    <div class="books" :class="`books${slideNum}`">
      <Book
        v-for="book in sortedBooks"
        :key="book.id"
        :book="book"
        class="book"
      />
    </div>

    <div class="pages" v-if="itemsPerPage > 1">
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
      :active="active"
      :itemsPerPage="itemsPerPage"
      @next-book="nextBook"
      :books="sortedBooks"
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
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 1% 2%;
  display: flex;
  margin: auto;
  width: 96%;
  height: 600px;
  align-items: center;
  gap: 20px;
  scroll-behavior: smooth;
}

.books::-webkit-scrollbar {
  display: none;
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
