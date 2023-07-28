<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
</script>

<template>
  <section>
    <Carousel class="carousel" autoplay="3000" transition="500" wrap-around="true">
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

.carousel {
    padding-top: 2%;
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.carousel__item {
  min-height: 500px;
  width: 93%;
  background-color: var(--primary-color);
  color: var(--primary-color);
  font-size: 20px;
  border-radius: 8px;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  position: absolute;
  box-sizing: content-box;
  border: 5px solid white;
}

</style>
