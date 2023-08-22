<script setup>
import { ref, onMounted } from 'vue';
import { useBookStore } from '@/stores/book.js';

const bookStore = useBookStore();

const currentSlide = ref(0)
const booksBestSellers = ref([])

function changeSlide(i) {
  const slides = document.querySelectorAll('.slideBestSellers .slide')
  if (i < 0) {
    return;
  }
  else if (i > slides.length - 1) {
    return;
  }
  currentSlide.value = i
  console.log(slides[currentSlide.value])
  setTimeout(
    () => {
      if (slides[currentSlide.value].classList.contains('activeSlide')) {
        slides[currentSlide.value].scrollIntoView(
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

onMounted(async () => {
  booksBestSellers.value = await bookStore.getBestSellers();

})
</script>

<template>
  <section class="bestSellers">
    <div class="slideBestSellers">
      <div v-for="book, index in booksBestSellers" :key="book.id">
        <div class="slide" :class="currentSlide == index ? 'activeSlide' : ''">
          <p>{{ book.title }}</p>
        </div>
      </div>
    </div>
    <div class="pagination">
      <span class="arrow" @click="changeSlide(currentSlide - 1)">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
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
  margin-top: 20px;
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
}

.slideBestSellers::-webkit-scrollbar {
  width: 0px;
  background: transparent;
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
  bottom: 0;
}

.pagination .arrow {
  height: 400px;
  background-color: #ffffffb7;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  cursor: pointer;
  opacity: 0.3;
  transition: all .3s;
}

.pagination .arrow:hover {
  opacity: 1;
}
</style>