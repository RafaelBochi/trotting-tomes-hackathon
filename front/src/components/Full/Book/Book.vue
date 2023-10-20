<script setup>
import { computed, ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user.js";
import { useOthersStore } from "@/stores/others.js";
import { useRouter } from "vue-router";
import { useFavoriteStore } from "@/stores/favorite.js";
import { useCartStore } from "@/stores/cart.js";

const userStore = useUserStore();
const othersStore = useOthersStore();
const favoriteStore = useFavoriteStore();
const cartStore = useCartStore();
const router = useRouter();

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
});

const favorite = computed(()=> {
  if (favoriteStore.favorites.find(item => item.book.id == props.book.id)) {
      return true;
    }
    else {
      return false;
    }
});

const comentsBook = ref([]);
const mediaStars = ref(0);

function addFavorite() {
  if (userStore.loggedIn == true) {
    if (favorite.value != true) {
      favoriteStore.addFavorite(props.book);
      favorite.value = true;
      console.log('add')
    }
    else {
      const id = favoriteStore.favorites.find(item => item.book.id == props.book.id).id;
      console.log(id)
      favoriteStore.deleteFavorite(id);
      favorite.value = false;
      console.log('delete')
    }
  }
  else {
    userStore.popUpLogin = true;
  }
}


function addToCart() {
  console.log(userStore.loggedIn)
  if (userStore.loggedIn == true) {
    cartStore.addBookCart(props.book.id, 1)
  }
  else {
    userStore.popUpLogin = true;
  }
}

function openBookPage() {
  router.push({ name: 'bookPage', params: { id: props.book.id } });
}

function format(book) {
  let formated = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
  return formated.format(book)
}

onMounted(async () => {
  comentsBook.value = await othersStore.getComents(props.book.id);
  if (comentsBook.value.length > 0) {
    for (let coment of comentsBook.value) {
      mediaStars.value += coment.stars
    }
    mediaStars.value = Math.ceil((mediaStars.value / comentsBook.value.length)).toFixed(1)
  }
})

</script>

<template>
  <span class="secBook">
    <div class="produto">
      <span class="favorite" @click="addFavorite">
        <font-awesome-icon v-if="favorite" :icon="['fas', 'heart']" style="color: var(--lime-green)" class="icon" />
        <font-awesome-icon v-else :icon="['fas', 'heart']" />
      </span>
      <div @click="openBookPage">
        <img :src="book.capa.url" alt="" />
        <span class="info">
          <div class="infoText">
            <p class="title">{{ book.title }}</p>
            <div class="genres">
                <p v-for="(genre, index) in book.genre" class="genre" :key="index">
                    {{ genre.name }} <i v-if="index < book.genre.length - 1">/</i>
                </p>
            </div>
          </div>
          <p class="price-sale" v-if="book.desconto > 0">
          <p class="priceReal">{{ format((Number(book.price / (1 - (book.desconto / 100)))).toFixed(2)) }}</p>
          <p class="priceDescount">
            {{ format(book.price) }}
          </p>
          </p>
          <p class="price" v-else>{{ format(book.price) }}</p>
          <div class="starsBook">
          <span class="stars" @click="goToComents">
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
          </span>

          <p>
            ({{ comentsBook.length }})
          </p>
        </div>
        </span>
      </div>
      <button @click="addToCart">
        <p>Adicionar</p>
        <font-awesome-icon :icon="['fas', 'cart-arrow-down']" style="color: #ffffff" size="sm" class="icon" />
      </button>
      <span class="sale" v-if="book.desconto > 0">
        <img src="/desconto.webp" alt="">
        <div class="text">
          <p>{{ Number(book.desconto).toFixed(0) }}%</p>
        </div>
      </span>
    </div>
  </span>
</template>

<style scoped>
.produto {
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 5px;
  gap: 10px;
  box-shadow: 5px 10px 15px -3px rgba(0, 0, 0, 0.185), -10px -5px 6px -4px rgb(0 0 0 / 0.1);
  margin: 20px;
}

.price {
  width: 30%;
  bottom: 0px;
  font-size: 1.6rem;
  padding: 5px;
  color: var(--lime-green);
  border-radius: 3px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
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
  padding-top: 30px;
  background-color: transparent;
  cursor: pointer;
}


.produto img {
  z-index: 2;
  position: relative;
  top: -5%;
  right: 5%;
  width: 200px;
  height: 280px;
  transition: all 0.5s;
  margin: auto;
}

.produto .info {
  position: relative;
  z-index: 2;
  height: 25%;
  display: flex;
  flex-direction: row;
  align-items: top;
  padding-bottom: 2%;
  width: 100%;
  background-color: transparent;
  flex-wrap: wrap;
  gap: 2px;
}

.produto .info .infoText {
  width: 65%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.produto .info .infoText .title {
  font-size: 1.6rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  padding-bottom: 10px;
  overflow: hidden;
}

.produto .info .genres {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 5px;
  padding: 0;
  overflow: auto;
  white-space: nowrap;
}

.produto .info .genres::-webkit-scrollbar {
  display: none;
}

.produto .info .genres p {
  font-size: 1.2rem;
  color: var(--third-color);
  display: flex;
  gap: 5px;
}

.price-sale {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.price-sale .priceReal {
  font-size: 1rem !important;
  text-decoration: line-through;
}

.price-sale .priceDescount {
  font-size: 1.6rem !important;
  color: var(--lime-green);
}

.produto .vendas {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 1.2rem;
}

button {
  position: absolute;
  top: 100%;
  margin-top: 10px;
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


.sale {
  position: absolute;
  top: 20px;
  left: -5px;
}

.sale img {
  width: 120px;
  height: 50px;
}

.sale .text {
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  left: -5px;
}

.sale .text p {
  font-size: 2rem;
  font-weight: bolder;
  color: #fff;
  z-index: 2;
  padding-bottom: 30px;
}

.starsBook {
  display: flex;
  position: absolute;
  bottom: -20%;
}

.stars {
    display: flex;
    align-items: center;
    position: relative;
    top: 8px;
}

.starsBook p {
    position: relative;
    top: 7px;
    left: 4px;
    font-size: 1.2rem;
    color: rgba(0, 0, 0, 0.521);
}

.stars input {
    display: none;
    
}

.stars>label {
    width: 18px;
    height: 18px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 18px;
    color: rgb(255, 140, 0);
}

.stars>label::before {
    content: "\2606";
}

.stars>.true::before {
    content: "\2605";
}
</style>
