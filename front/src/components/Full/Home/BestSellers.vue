<script setup>
import { ref, onMounted } from 'vue';
import { useBookStore } from '@/stores/book.js';
import router from '@/router/index.js';

const bookStore = useBookStore();

const currentSlide = ref(0)
const booksBestSellers = ref([])

function changeSlide(i) {
  const slides = document.querySelectorAll('.slideBestSellers .slide')
  currentSlide.value = i
  if (i < 0) {
    currentSlide.value = slides.length - 1
  }
  else if (i > slides.length - 1) {
    currentSlide.value = 0
  }
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

function openBookPage(id) {
  console.log(id)
  router.push({ name: 'bookPage', params: { id: id } });
}

onMounted(async () => {
  booksBestSellers.value = await bookStore.getBooksToSlides('bestSellers');
})
</script>

<template>
  <section class="bestSellers">
    <div class="slideBestSellers">
      <div v-for="book, index in booksBestSellers" :key="book.id">
        <img :src="book.capa.url" alt="" class="slide" :class="currentSlide == index ? 'activeSlide' : ''" @click="currentSlide == index ? openBookPage(book.id) : changeSlide(index)">
      </div>
    </div>
      <span class="arrow arrowBack" @click="changeSlide(currentSlide - 1)">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
      </span>
      <span class="arrow arrowNext" @click="changeSlide(currentSlide + 1)">
        <font-awesome-icon :icon="['fas', 'arrow-right']" />
      </span>
  </section>
</template>

<style scoped>
.bestSellers {
  position: relative;
  width: 90%;
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
  height: 500px;
  gap: 20px;
}

.slideBestSellers::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

.slide {
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  background-color: var(--primary-color);
  transition: all .3s;
  z-index: 8;
  cursor: pointer;
}

.activeSlide {
  width: 300px;
  height: 400px;
}


.arrow {
  height: 500px;
  background-color: #ffffffb7;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  cursor: pointer;
  opacity: 0.3;
  transition: all .3s;
  width: 30px;
  z-index: 9;
}

.arrowBack {
  position: absolute;
  left: 0;
}

.arrowNext {
  position: absolute;
  right: 0;
}

.arrow:hover {
  opacity: 1;
}
</style>