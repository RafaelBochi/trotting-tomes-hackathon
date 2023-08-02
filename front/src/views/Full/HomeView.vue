<script setup>
import Banners from "@/components/Full/Home/Banner.vue";
import SlideBooks from "@/components/Full/Home/SlideBooks";
import PopUpLogin from "@/components/Full/PopUpLogin.vue";
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

    <section class="sectionBooks">
      <h2>
        <p>Mais Vendidos</p>
      </h2>

      <SlideBooks :slideNum="1"/>
    </section>

    <section class="sectionBooks">
      <h2>
        <p>Novidades</p>
      </h2>

      <SlideBooks :slideNum="2"/>
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

</style>
