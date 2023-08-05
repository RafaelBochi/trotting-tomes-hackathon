<script setup>
import { computed, ref, onMounted } from "vue";
import BookPage from "./BookPage.vue";
import { useUserStore } from "@/stores/user.js";
import { useOthersStore } from "@/stores/others.js";

const userStore = useUserStore();
const othersStore = useOthersStore();

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
});

const favorite = ref(false);

const showBookPage = ref(false);

const comentsBook = ref([]);
const mediaStars = ref(0);

onMounted(async () => {
  await othersStore.getComents();
  for (let coment of othersStore.coments) {
    if (coment.livro.id == props.book.id) {
      coment.date = coment.date.split("T")[0].split("-").reverse().join("/");
      comentsBook.value.push(coment);
    }
  }

  if (comentsBook.value.length > 0) {
    for (let coment of comentsBook.value) {
      mediaStars.value += coment.stars
    }
    mediaStars.value = Math.ceil((mediaStars.value / comentsBook.value.length)).toFixed(1)
  }
})

function addFavorite() {
  console.log(favorite.value)
  if (favorite.value != true) {
    userStore.addFavorite(props.book);
    favorite.value = true;
    userStore.getFavorites();
  }
  else {
    const id = userStore.favorites.find(item => item.book.id == props.book.id).id;
    userStore.deleteFavorite(id);
    favorite.value = false;
    userStore.getFavorites();
  }
}

function toggleBookPage() {
  showBookPage.value = !showBookPage.value;

  if (showBookPage.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}

function addToCart() {
  if (userStore.loggedIn) {
    userStore.addBookCart(props.book.id, 1)
  }
  else {
    userStore.popUpLogin = true;
  }
}

onMounted(
  () => {
    if (userStore.favorites.find(item => item.book.id == props.book.id)) {
      favorite.value = true;
    }
    else {
      favorite.value = false;
    }
  }
);
</script>

<template>
  <span class="secBook">
    <div class="produto">
      <span class="favorite" @click="addFavorite">
        <font-awesome-icon
          v-if="favorite"
          :icon="['fas', 'heart']"
          style="color: var(--lime-green)"
          class="icon"
        />
        <font-awesome-icon v-else :icon="['fas', 'heart']" />
      </span>
      <div @click="toggleBookPage">
        <img :src="book.capa" alt="" />
        <span class="info">
          <p class="title">{{ book.title }}</p>
            <span class="stars">
              <input type="radio" />
              <label :class="mediaStars > 0 ? 'true' : ''"></label>

              <input type="radio" />
              <label :class="mediaStars > 1 ? 'true' : ''"></label>

              <input type="radio" />
              <label :class="mediaStars > 2 ? 'true' : ''"></label>

              <input type="radio" />
              <label :class="mediaStars > 3 ? 'true' : ''"></label>

              <input type="radio" />
              <label :class="mediaStars > 4 ? 'true' : ''"></label>

              <p>
                ({{ comentsBook.length }})
              </p>
            </span>
            <p class="price">R${{ book.price }}</p>
        </span>
        <i></i>
      </div>
      <div>
        <button @click="addToCart">
          <p>Adicionar</p>
          <font-awesome-icon
            :icon="['fas', 'cart-arrow-down']"
            style="color: #ffffff"
            size="sm"
          />
        </button>
      </div>
    </div>
  </span>

  <BookPage v-if="showBookPage" :book="book" @close="toggleBookPage" />
</template>

<style scoped>
.produto {
  width: 350px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  gap: 10px;
  box-shadow: var(--primary-color) 0px 0px 5px;
}

.price {
  position: absolute;
  bottom: 0;
  font-size: medium;
  background-color: var(--lime-green);
  padding: 5px;
  border-radius: 3px;
  color: rgb(255, 255, 255);
}


.favorite {
  position: absolute;
  top: 2%;
  right: 2%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  right: 4%;
  background-color: transparent;
  z-index: 4;
  cursor: pointer;
}

.favorite .fa-heart {
  transition: all 0.2s;
  color: #bac2cf;
  font-size: 20px;
}

.favorite:hover .fa-heart {
  color: var(--lime-green);
}

.produto div:nth-child(2) {
  position: absolute;
  top: 0;
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5%;
  background-color: transparent;
  cursor: pointer;
}

.produto div:nth-child(2) i {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  background-color: #cbced365;
  border-radius: 0 0 100% 0;
  width: 0;
  height: 0;
  transition: all 0.2s;
}

.produto div:nth-child(2):hover i {
  width: 100%;
  height: 100%;
  border-radius: 0;
}

.produto img {
  z-index: 2;
  position: relative;
  top: -14%;
  right: 5%;
  width: 180px;
  height: 230px;
  transition: all 0.5s;
  margin: auto;
}

.produto .info {
  z-index: 2;
  position: absolute;
  height: 25%;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 2%;
}

.produto .info p:nth-child(1) {
  font-size: 1.7rem;
  width: 95%;
  margin: 1%;
}

.produto .info p:nth-child(2) {
  font-size: 1.5rem;
  font-weight: bolder;
}

.produto .info .stars {
  display: flex;
  align-items: end;
  justify-content: center;
}

.stars {
  position: absolute;
  bottom: 35%;
}

.stars p {
  font-size: 1.4rem;
}

.produto div:nth-child(3) {
  position: absolute;
  bottom: 3%;
  width: 100%;
  height: 10%;
  padding: 4% 5% 1% 5%;
  background-color: #fff;
  z-index: 2;
}

button {
  padding: 4% 5%;
  background-color: var(--primary-color);
  border-radius: 2px;
  border: none;
  color: var(--white);
  font-weight: bolder;
  animation: button 0.5s forwards;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  gap: 5px;
}

button p {
  letter-spacing: 0.05rem;
}

button:hover {
  background-color: var(--lime-green);
}
</style>
