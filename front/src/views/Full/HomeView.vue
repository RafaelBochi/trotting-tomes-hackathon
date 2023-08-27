<script setup>
import Banners from "@/components/Full/Home/Banner.vue";
import SlideBooks from "@/components/Full/Home/SlideBooks.vue";
import PopUpLogin from "@/components/Full/PopUpLogin.vue";
import BestSellers from "../../components/Full/Home/BestSellers.vue";
import { computed, ref } from "vue";
import { useBookStore } from "@/stores/book.js";
import { useUserStore } from "@/stores/user.js";

const userStore = useUserStore();
const bookStore = useBookStore();

const books = computed(() => bookStore.books);

const popUpLogin = computed(() => userStore.popUpLogin);

</script>

<template>
  <main>
    <PopUpLogin v-if="popUpLogin"/>
    <Banners />

    <BestSellers/>

    <section class="sectionBooks">
      <h2>
        <p>Novidades</p>
      </h2>

      <SlideBooks :slideNum="1" :sort="[19, 7, 2, 10, 8, 1, 15, 0, 18, 4, 12, 5, 16, 14, 11, 20, 3, 13, 9, 17, 6]"/>
    </section>

    <section class="sectionBooks">
      <h2>
        <p>50% OFF</p>
      </h2>

      <SlideBooks :slideNum="2" :sort="[16, 2, 10, 1, 3, 9, 7, 14, 18, 0, 8, 4, 15, 11, 20, 13, 12, 5, 19, 6, 17]"/>
    </section>

    <section class="sectionBooks">
      <h2>
        <p>Melhores avaliações</p>
      </h2>

      <SlideBooks :slideNum="3" :sort="[2, 14, 17, 19, 12, 6, 5, 4, 9, 8, 1, 0, 18, 7, 15, 11, 20, 3, 16, 10, 13]"/>
    </section>

    <section class="sectionBooks">
      <h2>
        <p>Trending</p>
      </h2>

      <SlideBooks :slideNum="4" :sort="[15, 8, 4, 10, 13, 3, 1, 18, 19, 7, 0, 6, 14, 9, 12, 16, 2, 20, 5, 17, 11]"/>
    </section>
  </main>
</template>

<style scoped>
.sectionBooks {
  width: 90%;
  margin: 0 auto;
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
  color: var(--fourth-color);
  text-transform: uppercase;
}

.sectionBooks h2 p::after {
  content: "";
  display: flex;
  width: 100%;
  height: 2px;
  background-color: var(--fourth-color);
  position: absolute;
  left: 0;
  margin-top: 5px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

</style>
