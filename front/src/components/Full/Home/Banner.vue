<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const banners = ['/banner1.png', '/banner2.png']
</script>

<template>
  <section>
    <Carousel class="carousel" autoplay="3000" transition="500" wrap-around="true">
      <Slide v-for="banner, index in banners" :key="index">
        <img class="carousel__item" :src="banner" alt="" :class="`banner${index}`">
      </Slide>
    </Carousel>
  </section>
</template>

<style scoped>

.carousel {
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.carousel__item {
  max-height: 600px;
  min-height: 200px;
  width: 100%;
  background-color: var(--primary-color);
  color: var(--primary-color);
  font-size: 20px;
  object-fit: cover;
}

.banner0 {
  object-position: left;
}

.banner1 {
  object-position: right;
}

.carousel__prev,
.carousel__next {
  position: absolute;
  box-sizing: content-box;
  border: 5px solid white;
}

</style>
