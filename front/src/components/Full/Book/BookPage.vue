<script setup>
import { useUserStore } from "@/stores/user.js";
import { useOthersStore } from "@/stores/others";
import { onMounted, ref } from "vue";
import ComentsBook from "./ComentsBook.vue";

const userStore = useUserStore();
const othersStore = useOthersStore();

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
});

const comentsBook = ref([]);
const mediaStars = ref(0);

onMounted(() => {
  for( let coment of othersStore.coments) {
      if (coment.livro.id == props.book.id) {
        coment.date = coment.date.split("T")[0].split("-").reverse().join("/")
        comentsBook.value.push(coment)
      }
    }

    if (comentsBook.value.length > 0) {
      for( let coment of comentsBook.value) {
      mediaStars.value += coment.stars
    }
    mediaStars.value = Math.ceil((mediaStars.value / comentsBook.value.length)).toFixed(1)
    }
})

function addToCart() {
  if (userStore.loggedIn) {
    console.log("teste");
  } else {
    userStore.popUpLogin = true;
  }
}

function goToComents() {
  document.querySelector(".sec-coments").scrollIntoView({
    behavior: "smooth",
  });
}
</script>

<template>
  <section>
    <span class="close" @click="$emit('close')">
      <font-awesome-icon :icon="['fas', 'arrow-left']" size="2xl" />
    </span>
    <div>
      <img :src="book.capa" alt="" />

      <div class="info">
        <h2>
          {{ book.title }}
        </h2>

        <p class="price">R$ {{ book.price }}</p>

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
              <label :class="mediaStars > 4 ?'true' : ''"></label>
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
            <p>1</p>
            <i>
              <font-awesome-icon :icon="['fas', 'caret-up']" size="xl" />
              <font-awesome-icon :icon="['fas', 'caret-down']" size="xl" />
            </i>
          </span>
          <button @click="addToCart">Adicionar ao Carrinho</button>
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
        <p>360</p>
      </div>

      <div>
        <p>ISBN</p>
        <p>
          {{ book.isbn }}
        </p>
      </div>
    </div>

    <ComentsBook :book="book"/>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  height: 91.5%;
  position: fixed;
  top: 8.5%;
  left: 0;
  background: #fff;
  z-index: 8;
  align-items: center;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  overflow-y: scroll;
  gap: 10%;
}

.close {
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
}

section > div {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 2%;
}

section > div img {
  width: 25%;
}

.info {
  width: 40%;
  display: flex;
  flex-direction: column;
}

.info h2 {
  font-size: 3rem;
  font-weight: 400;
}

.info .price {
  font-size: 2rem;
  font-weight: 400;
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
  font-size: 1.4rem;
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

.info .actions span i > * {
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

.details {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 2%;
  width: 80%;
  background-color: var(--cinza);
  border-radius: 5px;
  gap: 20px;
  font-size: 1.5rem;
}

.details > div {
  display: flex;
  justify-content: space-between;
  width: 50%;
}


</style>
