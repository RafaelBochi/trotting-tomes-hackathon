<script setup>
import { useUserStore } from "@/stores/user.js";
import { useOthersStore } from "@/stores/others";
import { useBookStore } from "@/stores/book";
import { useGlobalStore } from "@/stores/global";
import { useCartStore } from "@/stores/cart";
import { useFavoriteStore } from "@/stores/favorite";
import { onMounted, ref, computed } from "vue";
import ComentsBook from "@/components/Full/Book/ComentsBook.vue";
import router from "@/router";

const userStore = useUserStore();
const othersStore = useOthersStore();
const bookStore = useBookStore();
const globalStore = useGlobalStore();
const cartStore = useCartStore();
const favoriteStore = useFavoriteStore();

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const quantCart = ref(1)
const comentsBook = ref([]);
const mediaStars = ref(0);
const book = ref({
  id: 0,
  title: "",
  price: 0,
  capa: "",
  author: {
    name: "",
  },
  stock: 0,
  paginas: 0,
  desconto: 0
})

const favorite = computed(()=> {
  if (favoriteStore.favorites.find(item => item.book.id == props.id)) {
      return true;
    }
    else {
      return false;
    }
});

function addToCart() {
  if (userStore.loggedIn) {
    cartStore.addBookCart(book.value.id, quantCart.value)
  } else {
    userStore.popUpLogin = true;
  }
}

function goToComents() {
  document.querySelector(".sec-coments").scrollIntoView({
    behavior: "smooth",
  });
}

router.afterEach(async (to) => {
  globalStore.showPreloader = true
  setTimeout(async () => {
    book.value = await bookStore.getBookId(props.id);
    globalStore.showPreloader = false;
  }, 1000)
});

function plusQuantCart() {
  if (quantCart.value == book.value.stock) {
    return;
  }
  quantCart.value++
}

function minusQuantCart() {
  if (quantCart.value > 1) {
    quantCart.value--
  }
}

function addFavorite() {
  if (userStore.loggedIn == true) {
    if (favorite.value != true) {
      favoriteStore.addFavorite(book.value);
      favorite.value = true;
      console.log('add')
    }
    else {
      const id = favoriteStore.favorites.find(item => item.book.id == props.id).id;
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

function format(book) {
  let formated = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
  return formated.format(book)
}

onMounted(async () => {
  book.value = await bookStore.getBookId(props.id);
  comentsBook.value = await othersStore.getComents(book.value.id);
  for (let coment of comentsBook.value) {
    coment.date = coment.date.split("T")[0].split("-").reverse().join("/")
  }

  if (comentsBook.value.length > 0) {
    for (let coment of Object.values(comentsBook.value)) {
      mediaStars.value += coment.stars
    }
    mediaStars.value = Math.ceil((mediaStars.value / comentsBook.value.length)).toFixed(1)
  }
})
</script>

<template>
  <section>
    <div>
      <img :src="book.capa.url" alt="" />

      <div class="info">
        <h2>
          {{ book.title }}
        </h2>

        <div class="genres">
          <p v-for="genre, index in book.genre" class="genre">

          <p v-if="index !== 0">&</p>
          {{ genre.name }}
          </p>
        </div>

        <div class="sale" v-if="book.desconto > 0">
          <p class="priceSale">
            {{ format(book.price) }}
          </p>
          <p class="priceReal">
            {{ format((Number(book.price / (1 - (book.desconto / 100)))).toFixed(2)) }}
          </p>
          <i class="bar"></i>
          <p class="descount">
            {{ Number(book.desconto).toFixed(0) }}% OFF
          </p>
        </div>
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
            ({{ comentsBook.length }} avaliações)
          </p>
        </div>

        <p class="description">
          "O Lado Bom, o Lado Ruim" é um livro de Matthew Quick que conta a
          história de Pat Peoples, um homem recém-libertado de uma instituição
          psiquiátrica. Determinado a reconstruir sua vida, Pat enfrenta
          desafios pessoais e familiares. Ele mantém uma perspectiva otimista da
          vida, buscando encontrar "o lado bom" em todas as situações. Ao se
          envolver com Tiffany, uma mulher igualmente problemática, eles
          desenvolvem uma amizade especial enquanto enfrentam suas dificuldades.
          O livro aborda temas como doença mental, superação, relacionamentos
          familiares e amor. "O Lado Bom, o Lado Ruim" oferece uma visão
          compassiva sobre as lutas internas e externas dos personagens,
          explorando a condição humana. O livro foi adaptado para o cinema com o
          filme "O Lado Bom da Vida", dirigido por David O. Russell.
        </p>

        <div class="actions">
          <span>
            <p>{{ quantCart }}</p>
            <i>
              <font-awesome-icon :icon="['fas', 'caret-up']" size="xl" @click="plusQuantCart" />
              <font-awesome-icon :icon="['fas', 'caret-down']" size="xl" @click="minusQuantCart" />
            </i>
          </span>
          <button @click="addToCart">Adicionar ao Carrinho</button>
          <span class="favorite" @click="addFavorite">
            <font-awesome-icon v-if="favorite" :icon="['fas', 'heart']" style="color: var(--lime-green)" class="icon" />
            <font-awesome-icon v-else :icon="['fas', 'heart']" />
          </span>
          <p class="restantes">
            {{ book.stock }} restantes
          </p>
        </div>
      </div>
    </div>

    <div class="details">
      <h2>Especificações</h2>

      <div>
        <p>Ano da Edição</p>
        <p>2019</p>
      </div>

      <div>
        <p>Autor</p>
        <p>
          {{ book.author.name }}
        </p>
      </div>

      <div>
        <p>Número de Páginas</p>
        <p>{{ book.paginas }}</p>
      </div>

      <div>
        <p>ISBN</p>
        <p>
          978-8535908064
        </p>
      </div>
    </div>

    <ComentsBook :book="book" :coments="comentsBook" />
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  height: calc(100% - 60px);
  position: fixed;
  top: 60px;
  left: 0;
  background: #fff;
  z-index: 8;
  align-items: center;
  box-shadow: inset rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  overflow-y: scroll;
  overflow-x: hidden;
  gap: 10%;
}

section>div {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 2%;
  flex-wrap: wrap;
  gap: 20px;
}

section>div img {
  width: 30%;
  min-width: 300px;
}

.info {
  width: 40%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
}

.info h2 {
  font-size: 3rem;
  font-weight: 400;
}

.info .genres {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
  font-size: 1.2rem;
}

.info .genres .genre {
  display: flex;
  gap: 10px;
}

.info .price {
  color: var(--primary-color);
  font-size: 1.8rem;
  font-weight: bolder;
  margin: 10px 0;
}

.info .starsBook {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-top: 1%;
}

.info .starsBook p {
  font-size: 1.3rem;
  margin-top: -1%;
}

.info .description {
  font-size: 1.7rem;
  font-weight: 400;
  text-align: justify;
  margin: 4% 0;
}

.info .actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.info .actions span {
  display: flex;
  align-items: center;
}

.info .actions span p {
  font-size: 2rem;
  font-weight: 400;
  margin: 0 10px;
}

.info .actions span i {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 10px;
}

.info .actions span i>* {
  cursor: pointer;
}

.info .actions button {
  width: 200px;
  height: 40px;
  background: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 3px;
  font-size: 1.5rem;
  font-weight: 400;
  cursor: pointer;
}

.info .actions .restantes {
  font-size: 1.3rem;
}

.details {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 2%;
  width: 100%;
  max-width: 900px;
  background-color: var(--cinza);
  border-radius: 5px;
  gap: 20px;
  font-size: 1.5rem;
}

.details>div {
  display: flex;
  justify-content: space-between;
  width: 300px;
}

.sale {
  display: flex;
  gap: 5px;
  align-items: end;
  margin: 10px 0;
}

.sale .priceSale {
  color: var(--primary-color);
  font-size: 1.8rem;
  font-weight: bolder;
  height: 18px;
}

.sale .priceReal {
  color: var(--primary-color-50);
  font-size: 1.2rem;
  font-weight: bolder;
  text-decoration: line-through;
}

.sale .descount {
  color: var(--lime-green);
  font-size: 1.2rem;
  font-weight: bolder;
}

.sale .bar {
  width: 1px;
  height: 20px;
  background-color: var(--primary-color-50);
  margin: 0 5px;
}

.favorite .fa-heart {
  transition: all 0.2s;
  color: #bac2cf;
  font-size: 20px;
}

.favorite:hover .fa-heart {
  color: var(--lime-green);
}
</style>
