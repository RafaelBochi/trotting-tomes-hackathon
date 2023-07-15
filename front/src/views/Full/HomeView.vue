<script setup>
import Banners from "../../components/Full/Home/Carousel.vue";
import Book from "../../components/Full/Book.vue";
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import { computed } from "vue";
import { useBookStore } from "@/stores/book.js";

const bookStore = useBookStore();

const books = computed(() => bookStore.books);

</script>

<template>
  <main>
    <Banners />

    <section class="sectionBooks">
      <h2>
        <p>Mais Vendidos</p>
      </h2>

      <Carousel :items-to-show="5" :breakpoints="breakpoints" :snap-align="start" :items-to-scroll="5">
        <Slide v-for="book in books" :key="book" class="slide">
          <div class="carousel__item">
            <Book :book="book"/>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </section>

    <section class="sectionBooks">
      <h2>
        <p>Novidades</p>
      </h2>

      <Carousel :items-to-show="5" :breakpoints="breakpoints" :snap-align="start" :items-to-scroll="5">
        <Slide v-for="book in books" :key="book" class="slide">
          <div class="carousel__item">
            <Book :book="book"/>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </section>
  </main>
</template>

<style scoped>
.sectionBooks {
  width: 90%;
  margin: auto;
  margin-top: 50px;
  padding: 1%;
}

h2 {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  padding-left: 2%;
}

.sectionBooks h2 p {
  font-size: 2.5rem;
  width: 100%;
  font-weight: bolder;
  color: var(--primary-color);
}

.sectionBooks h2 p::after {
  content: "";
  display: flex;
  width: 100%;
  height: 4px;
  background-color: var(--primary-color);
  position: absolute;
  left: 0;
  margin-top: 5px;
}

.carousel__item {
  min-height: 200px;
  width: 80%;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
