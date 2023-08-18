<script setup>
import { computed, onMounted, ref, defineComponent } from "vue";
import { useBookStore } from "@/stores/book.js";
import { useOthersStore } from "@/stores/others.js";
import Book3d from "../Book/Book3d.vue";
import Book from "../Book/Book.vue";

const bookStore = useBookStore();
const othersStore = useOthersStore();

const bestSellers = computed(() => {
  const books = bookStore.books.sort(
    (livroA, livroB) => livroB.vendas - livroA.vendas
  );
  return books.slice(0, 5);
});

function nextSlide(index) {
  const slides = document.querySelectorAll(".slide");
  slides[index].scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "nearest",
  }); 
  currentBook.value = index + 1;
}


const currentBook = ref(1);

</script>

<template>
  <section>
    <div class="carousel">
      <div v-for="i in 10" :key="i" :class="currentBook == i ? 'current' : currentBook == i + 1 ? 'rightBook' : currentBook == i - 1 ? 'leftBook' : 'notCurrent'" @click="nextSlide(i - 1)">
        <div class="slide">
          <p>{{ i }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 5px;
  margin: 20px auto;
  gap: 10px;
}

.current > .slide{
  background-color: rgb(148, 148, 246) ;
  z-index: 9;
  animation: current 0.5s ease-in-out;
}

.rightBook > .slide{
  background-color: crimson;
  width: 350px;
  height: 350px;
}

.leftBook > .slide {
  background-color: crimson;
  width: 350px;
  height: 350px;
}

.notCurrent > .slide {
  background-color: rgb(148, 148, 246);
  width: 300px;
  height: 300px;
}

@keyframes current {
  0% {
    width: 350px;
    height: 350px;
  }
  100% {
    width: 500px;
    height: 500px;
  }
}

.carousel {
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 1% 2%;
  display: flex;
  margin: auto;
  width: 96%;
  height: 600px;
  align-items: center;
  gap: 20px;
  scroll-behavior: smooth;
}

.slide {
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  gap: 10px;
  box-shadow: 10px 10px 15px -3px rgba(0, 0, 0, 0.185), 7px 4px 6px -4px rgb(0 0 0 / 0.1);
}

.book {
  width: 30%;
  height: 400px;
  cursor: pointer;
  transition: all 0.5s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  border: 1px solid black;
  background: var(--primary-color-50);
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
