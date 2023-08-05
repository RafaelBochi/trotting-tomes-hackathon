<script setup>
import { computed, onMounted, ref } from "vue";
import { useBookStore } from "@/stores/book.js";
import { useOthersStore } from "@/stores/others.js";

const bookStore = useBookStore();
const othersStore = useOthersStore();

const bestSellers = computed(() => {
  const books = bookStore.books.sort(
    (livroA, livroB) => livroB.vendas - livroA.vendas
  );
  return books.slice(0, 3);
});

onMounted(async () => {
  await othersStore.getComents();
  for (let book of bestSellers.value) {
    let comentsBook = [];
    for (let coment of othersStore.coments) {
      if (coment.livro.id == book.id) {
        coment.date = coment.date.split("T")[0].split("-").reverse().join("/");
        comentsBook.push(coment);
      }

      let mediaStars = 0;
      if (comentsBook.length > 0) {
        for (let coment of comentsBook) {
          mediaStars += coment.stars;
        }
        book.mediaStars = Math.ceil(mediaStars / comentsBook.length).toFixed(1);
      }
    }
  }
});
</script>

<template>
  <section>
    <div class="book" v-for="book in bestSellers" :key="book.id">
      <img :src="book.capa" alt="" />
      <i></i>
      <div class="info">
        <h3 class="title">{{ book.title }}</h3>
        <p class="author">{{ book.author.name }}</p>
        <div class="stars">
          <input type="radio" />
          <label :class="book.mediaStars > 0 ? 'true' : ''"></label>

          <input type="radio" />
          <label :class="book.mediaStars > 1 ? 'true' : ''"></label>

          <input type="radio" />
          <label :class="book.mediaStars > 2 ? 'true' : ''"></label>

          <input type="radio" />
          <label :class="book.mediaStars > 3 ? 'true' : ''"></label>

          <input type="radio" />
          <label :class="book.mediaStars > 4 ? 'true' : ''"></label>
        </div>
        <p class="price">R$ {{ book.price }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 500px;
  overflow: hidden;
  border-radius: 5px;
  margin: 20px auto;
  gap: 10px;
}

.book {
  position: relative;
  width: 10%;
  height: 400px;
  cursor: pointer;
  transition: all 0.5s;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
}

.book img {
  width: 100%;
  height: 400px;
  transition: all 0.5s;
  object-fit: cover;
}
.book i {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: var(--primary-color-50);
  border-radius: 5px;
}

.book .info {
    display: flex;
    flex-direction: column;
    height: 50%;
    gap: 5px;
    display: none;
    transition: all .5s;
    transition-delay: 1s;
}

.title {
    font-size: 2.0rem;
    text-transform: uppercase;
    color: var(--lime-green);
    font-weight: bolder;
}

.author {
    font-size: 1.2rem;
}

.price {
    background-color: var(--lime-green);
    padding: 1%;
    width: 35%;
    text-align: center;
    font-size: 1.6rem;
    border-radius: 5px;
    color: #fff;
    font-weight: bolder;
    margin-top: 4%;
}

.book:hover {
  width: 50%;
}

.book:hover img {
  width: 200px;
  height: 300px;
}

.book:hover .info {
  display: flex;
}
</style>
