<script setup>
import { ref, computed } from "vue";
import { useBookStore } from "@/stores/book";
import router from '@/router'

const bookStore = useBookStore();
const inputText = ref("");

const searchBooks = computed(() => bookStore.searchBooks);

function getSearchBooks() {
  console.log(inputText.value);
  const search = {
    name: inputText.value,
  };
  bookStore.getSearchBooks(search);
}

function clearInput() {
  inputText.value = "";
}

function openBookPage(id) {
  router.push({ name: 'bookPage', params: { id: id } });
  clearInput()
}

</script>

<template>
  <section>
  <div class="searchSection">
    <div class="search">
      <input
        type="text"
        placeholder="Busque aqui seu produto..."
        @input="getSearchBooks"
        v-model="inputText"
      />
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="searchIcon"/>
      <i @click="clearInput" v-if="inputText != ''" class="closeIcon">
        <font-awesome-icon :icon="['fas', 'x']" size="sm" />
      </i>
    </div>

  <div class="searchBooks" v-if="inputText != ``">
    <div v-for="book in searchBooks" :key="book.id" @click="openBookPage(book.id)">
      <img :src="book.capa.url" alt="" />
      <div class="info">
        <h3>{{ book.title }}</h3>
        <p>R$ {{ book.price }}</p>
      </div>
    </div>
  </div>
</div>
</section>
</template>

<style scoped>

section {
  width: 80%;
  min-width: 200px;
  max-width: 600px;
}
.searchSection {
  width: 100%;
}
.search {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
.search input {
  outline: none;
  border-radius: 10px;
  border: none;
  box-shadow: var(--primary-color) 0px 0px 5px;
  padding: 2%;
  padding-left: 3%;
  padding-right: 20%;
  width: 100%;
  height: 32px;
}

.search .searchIcon {
  position: absolute;
  right: 3%;
}

.search .closeIcon {
    position: absolute;
    right: 10%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.search .closeIcon::after {
  content: '';
  width: 1px;
  height: 20px;
  background-color: #00000069;
}

.searchBooks {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 110%;
  left: 0;
  background-color: #fff;
  padding: 1%;
  z-index: 9;
  max-height: 500%;
  overflow: auto;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.searchBooks > div {
    width: 90%;
    height: 100px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    padding: 2%;
    margin-bottom: 2%;
    gap: 10px;
  background-color: #fff;
}

.searchBooks > div img {
    width: 60px;
    height: 80px;
}

.searchBooks > div .info {
    height: 60%;
    display: flex;
    flex-direction: column;
}

.searchBooks > div .info h3 {
    font-size: 1.4rem;
    font-weight: bolder;
}

.searchBooks > div .info p {
    font-size: 1.2rem;
    font-weight: bolder;
    color: var(--primary-color);
}

@media screen and (max-width: 620px) {
  section {
    position: absolute;
    left: 0;
    top: 60px;
    width: 100vw;
    background-color: #fff;
    height: 50px;
    align-items: center;
    justify-content: center;
    border-top: 2px solid #d2d2d2;
    box-shadow: 0px 1px 20px -9px rgba(52, 71, 52, 1);
  }
  .searchSection {
    width: 250px;
    align-items: center;
    justify-content: center;
    margin: auto;
    position: relative;
    top: 8px;
  }

  .search {
    align-items: center;
    justify-content: center;
  }
}
</style>
