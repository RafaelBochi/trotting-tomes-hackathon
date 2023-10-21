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

      <SlideBooks :slideNum="1" :type="'news'"/>
    </section>

    <section class="sectionBooks">
      <h2>
        <p>50% OFF</p>
      </h2>

      <SlideBooks :slideNum="2" :type="'50off'"/>
    </section>

    <section class="sectionBooks">
      <h2>
        <p>Melhores Preços</p>
      </h2>

      <SlideBooks :slideNum="3" :type="'bestPrice'"/>
    </section>

    <section class="sectionBooks">
      <h2>
        <p>Populares</p>
      </h2>

      <SlideBooks :slideNum="4" :type="'trending'"/>
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
