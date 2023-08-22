<script setup>
import { ref } from 'vue';

const currentSlide = ref(0)

function changeSlide(i) {
  const slides = document.querySelectorAll('.slideBestSellers .slide')
  currentSlide.value = i
  setTimeout(
    () => {
      if (slides[i].classList.contains('activeSlide')) {
        slides[i].scrollIntoView(
          {
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest'
          }
        )
      }
    }, 300
  )

} 
</script>

<template>
  <section class="bestSellers">
    <div class="slideBestSellers">
    <div v-for="i in 10" :key="i">
      <div class="slide" :class="currentSlide == i - 1 ? 'activeSlide' : ''">
        <p>{{ i }}</p>
      </div>
    </div>
    </div>
    <div class="pagination">
      <span class="arrow" @click="changeSlide(currentSlide - 1)">
        <font-awesome-icon :icon="['fas', 'arrow-left']"/>
      </span>
      <span class="arrow" @click="changeSlide(currentSlide + 1)">
        <font-awesome-icon :icon="['fas', 'arrow-right']" />
      </span>
    </div>
  </section>
</template>

<style scoped>

.bestSellers {
  position: relative;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
}
.slideBestSellers {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  overflow-x: scroll;
  overflow-y: hidden;
  height: 400px;
  gap: 20px;
  margin-top: 20px;
}

.slide {
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  background-color: var(--primary-color);
  transition: all .3s;
}

.activeSlide {
  width: 400px;
  height: 400px;
}

.pagination {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
  top: 0;
}

.pagination .arrow {
  height: 400px;
  background-color: #ffffff8b;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  cursor: pointer;
}
</style>