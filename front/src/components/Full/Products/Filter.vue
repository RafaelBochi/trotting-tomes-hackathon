<script setup>
import { ref, computed, defineEmits } from "vue";
import { useOthersStore } from "@/stores/others.js";
import { useBookStore } from "@/stores/book.js";

const othersStore = useOthersStore();
const storeBooks = useBookStore();

const genres = computed(() => othersStore.genres);
const authors = computed(() => othersStore.authors);

const searchBooks = computed(() => storeBooks.books.length);

const showFilters = ref(false);
const closeFilters = ref(false)
const showOrders = ref(false);

const price = ref(200)

const toggleFilters = () => {
  showOrders.value = false;

  if(showFilters.value) {
    closeFilters.value = true;
    setTimeout(() => {
      closeFilters.value = false;
      showFilters.value = !showFilters.value
    }, 500)
  }
  else {
    showFilters.value = !showFilters.value;
  }
};

let selectedOrder = ref("");

function getOrders() {
  const radioButtons = document.getElementsByName("order");
  for (let radios of radioButtons) {
    if (radios.checked) {
      selectedOrder.value = radios.value;
    }
  }
}


const toggleOrders = () => {
  showOrders.value = !showOrders.value;
};

const emit = defineEmits(['page-change']);


function getBookFilters() {
  getOrders();

  const filters = {
    order: selectedOrder.value,
    maxPrice: price.value
  };
  storeBooks.getBooksFilter(filters);
  emit('page-change', 1);
  console.log(price.value);
}

function cleanFilters() {
  selectedOrder.value = "";
  price.value = 200;
  const radioButtons = document.getElementsByName("order");
  for (let radios of radioButtons) {
    if (radios.checked) {
      radios.checked = false;
    }
  }
  storeBooks.getBooks();
}
</script>

<template>
  <section>
    <button @click="toggleFilters" class="btnFilters">
      <p>Filtrar e Organizar</p>
      <font-awesome-icon :icon="['fas', 'filter']" />
    </button>

    <span v-if="showFilters" class="secFilters" >
    <i @click="toggleFilters"></i>
    <div class="form" :class="closeFilters != false ? 'closeForm' : ''">
      <span class="close" @click="toggleFilters">
        <font-awesome-icon :icon="['fas', 'circle-xmark']" size="2xl" />
      </span>
      <span class="title">
        <h2>Filtrar e Organizar</h2>
        <p @click="cleanFilters">Limpar todos</p>
      </span>
      <div class="filters">
      <div class="orders">
        <div @click="toggleOrders">
          <p>Ordenar Por:</p>

          <font-awesome-icon
            v-if="showOrders"
            :icon="['fas', 'chevron-up']"
            class="icon"
            size="2xl"
          />
          <font-awesome-icon
            v-else
            :icon="['fas', 'chevron-down']"
            class="icon"
            size="2xl"
          />
        </div>
        <div v-if="showOrders" @change="getBookFilters">
          <span>
            <input type="radio" name="order" id="order1" value="1" />
            <label for="order1"></label>
            <p>Mais Vendidos</p>
          </span>

          <span>
            <input type="radio" name="order" id="order2" value="2" />
            <label for="order2"></label>
            <p>Menor Preço</p>
          </span>

          <span>
            <input type="radio" name="order" id="order3" value="3" />
            <label for="order3"></label>
            <p>Maior Preço</p>
          </span>

          <span>
            <input type="radio" name="order" id="order4" value="4" />
            <label for="order4"></label>
            <p>Novidades</p>
          </span>
        </div>
      </div>

      <div class="price">
        <h3>
          Preço Maximo
        </h3>
        <p>
          R$ {{ Number(price).toFixed(2) }}
        </p>
        <input type="range" min="0" max="200" v-model="price" @change="getBookFilters">
      </div>
    </div>
      <span class="searchButton">
        <button @click="toggleFilters, getBookFilters">
          <p>Filtrar ({{ searchBooks }})</p>
          <font-awesome-icon :icon="['fas', 'arrow-right']" />
        </button>
      </span>
    </div>
  </span>
  </section>
</template>

<style scoped>
section {
  position: relative;
  width: 94%;
  height: 91%;
}

.btnFilters {
  position: absolute;
  right: 0%;
  width: 200px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid var(--lime-green);
  font-weight: bolder;
  color: #fff;
  background: var(--lime-green);
}

.secFilters {
  position: fixed;
  top: 60px;
  right: 0;
  width: 100vw;
  height: 100%;
  min-height: 300px;
  z-index: 9;
  display: flex;
}

.secFilters i {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

.form {
  position: absolute;
  right: 0;
  top: 0;
  background-color: #fff;
  max-width: 380px;
  min-width: 200px;
  width: 400px;
  height: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  animation: form 0.5s forwards;
}

@keyframes form {
  0% {
    right: -400px;
  }

  100% {
    right: 0;
  }
}

.closeForm {
  animation: closeForm 0.5s forwards;
}

@keyframes closeForm {
  0% {
    right: 0;
  }

  100% {
    right: -400px;
  }
}

.close {
  width: 100%;
  padding: 2% 2% 0 0;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2% 2%;
  padding-right: 6%;
  border-bottom: 2px solid var(--cinza);
  width: 100%;
}

.title > h2 {
  font-size: 1.8rem;
  font-weight: bolder;
  text-align: center;
  text-transform: uppercase;
  color: var(--lime-green);
  padding: 0% 2%;
  width: 80%;
  white-space: nowrap;
}

.title > p {
  font-size: 1.3rem;
  font-weight: bolder;
  text-align: center;
  text-transform: uppercase;
  color: var(--primary-color);
  padding: 0% 2%;
  cursor: pointer;
  white-space: nowrap;
}

.filters {
    height: 80%;
    overflow-y: auto;
}

.filters::-webkit-scrollbar {
  width: 5px;
}

.filters::-webkit-scrollbar-track {
  background: transparent;
}

.filters::-webkit-scrollbar-thumb {
  background-color: var(--lime-green);
  border-radius: 20px;
  border: 3px solid var(--lime-green);
}

.filters > div {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 3% 2% 3% 4%;
  border-bottom: 2px solid var(--cinza);
}

.filters > div > div:nth-child(1) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding-right: 4%;
}

.filters > div > div:nth-child(1) p {
  font-weight: bolder;
  font-size: 1.7rem;
  text-transform: uppercase;
}

.orders > div{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.orders > div > span {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 1.4rem;
}

.orders div:nth-child(2) span{
  width: 45%;
  display: flex;
  gap: 5px;
}

.orders div:nth-child(2) span p {
  white-space: nowrap;
}

.orders input {
  display: none;
}

.orders input + label{
  /* Estilizar a aparência do quadrado */
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.orders input:checked + label{
  /* Mudar a cor quando selecionado */
  background-color: var(
    --lime-green
  ); /* Substitua pelo valor da cor desejada */
}

.price h3 {
  color: #000;
  font-weight: bold;
  font-size: 1.8rem;
  text-transform: uppercase;
}

.price p {
  font-size: 1.4rem;
}


.searchButton {
  position: absolute;
  width: 100%;
  height: 10%;
  bottom: 9%;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1% 0;
  background-color: #fff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.searchButton button {
  width: 80%;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: var(--lime-green);
  color: #fff;
  font-weight: bolder;
  font-size: 1.5rem;
  cursor: pointer;
  text-align: start;
  padding: 0 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media screen and (max-width: 620px) {
  .form {
    padding-top: 50px !important;
  }
}
</style>
