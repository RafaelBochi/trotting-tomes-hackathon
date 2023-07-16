<script setup>
import { ref, computed } from "vue";
import { useBookStore } from "@/stores/book";

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
</script>

<template>
  <section>
    <div class="search">
      <input
        type="text"
        placeholder="Busque aqui seu produto..."
        @input="getSearchBooks"
        v-model="inputText"
      />
      <i @click="clearInput" v-if="inputText != ''">
        <font-awesome-icon :icon="['fas', 'xmark-circle']" size="xl" />
      </i>
    </div>

  <div class="searchBooks" v-if="inputText != ``">
    <div v-for="book in searchBooks" :key="book.id">
      <img :src="book.capa" alt="" />
      <div class="info">
        <h3>{{ book.title }}</h3>
        <p>R$ {{ book.price }}</p>
      </div>
    </div>
  </div>
  
</section>
</template>

<style scoped>

section {
    position: relative;
}

.search {
    position: relative;
    display: flex;
    align-items: center;
}
.search input {
  outline: none;
  border-radius: 10px;
  border: none;
  box-shadow: var(--primary-color) 0px 0px 5px;
  padding: 2%;
  padding-left: 3%;
  width: 300px;
  height: 32px;
}

.search i {
    position: absolute;
    right: 3%;
    cursor: pointer;
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
  z-index: 10;
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
</style>
