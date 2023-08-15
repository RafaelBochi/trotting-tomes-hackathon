<script setup>
import { computed, onMounted, ref, defineComponent } from "vue";
import { useBookStore } from "@/stores/book.js";
import { useOthersStore } from "@/stores/others.js";
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import Book3d from "../Book/Book3d.vue";

const bookStore = useBookStore();
const othersStore = useOthersStore();

const bestSellers = computed(() => {
  const books = bookStore.books.sort(
    (livroA, livroB) => livroB.vendas - livroA.vendas
  );
  return books.slice(0, 5);
}); 
</script>

<template>
  <section>

    <Carousel>
      <Slide v-for="slide in 10" :key="slide">
        <div class="carousel__item">{{ slide }}</div>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </section>
</template>

<style scoped>
section {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 5px;
  margin: 20px auto;
  gap: 10px;
}


.book {
  position: relative;
  width: 30%;
  height: 400px;
  cursor: pointer;
  transition: all 0.5s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  background: var(--primary-color-50);
}

.book img {
  width: 100%;
  height: 400px;
  transition: all 0.5s;
  object-fit: cover;
}

.carousel__slide {
  padding: 5px;
  border: 2px solid black;
  height: 200px;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}

.book i {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
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
  white-space: nowrap;
}

.author {
  font-size: 1.2rem;
}

.price {
  background-color: var(--lime-green);
  padding: 1%;
  max-width: 120px;
  min-width: 80px;
  text-align: center;
  font-size: 1.6rem;
  border-radius: 5px;
  color: #fff;
  font-weight: bolder;
  margin-top: 4%;
}

.active {
  width: 80%;
  height: 500px;
  padding: 5%;
}

.active img {
  width: 100%;
  height: 400px;
  object-fit: contain;
}

.active .info {
  display: flex;
}

.deactive {
  width: 10% !important;
}

.book3dDeactive {
  display: none;
}

.book3dActive {
  display: block;
}
</style>
