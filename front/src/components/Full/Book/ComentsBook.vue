<script setup>
import { useUserStore } from "@/stores/user";
import { useOthersStore } from "@/stores/others";
import { computed, onMounted, onUpdated, ref } from "vue";
import FormComent from "./FormComent.vue";

const userStore = useUserStore();
const othersStore = useOthersStore();

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
  coments: {
    type: Array,
    required: true,
  },
});

const filterComents = ref([]);
const mediaStars = computed(()=> {
  if (props.coments.length == 0) {
    return 0;
  } 
  else {
    let stars = 0;
    for (let coment of props.coments) {
      stars += coment.stars;
    }

    stars = Math.ceil(
      stars / props.coments.length
    ).toFixed(1);

    return stars;
  }
});
const showFormComent = ref(false);

onUpdated( () => {
  filterComents.value = props.coments;
});

async function addComent(comentInputs) {
  const coment = {
    title: comentInputs.title,
    text: comentInputs.text,
    stars: comentInputs.stars,
    livro: props.book.id,
    user: userStore.user.id,
  }
  await othersStore.addComent(coment)
  toggleFormComent();
  props.coments = await othersStore.getComents(props.book.id);
  window.location.reload()
}

function filterComentsFunc(stars) {
  console.log(props.coments)
  filterComents.value = [];
  for (let coment of props.coments) {
    if (coment.stars == stars) {
      coment.date = coment.date.split("T")[0].split("-").reverse().join("/");
      filterComents.value.push(coment);
    }
  }
}

function toggleFormComent() {
  if (userStore.loggedIn) {
    showFormComent.value = !showFormComent.value;
  } else {
    userStore.popUpLogin = true;
  }
}
</script>

<template>
  <FormComent v-if="showFormComent" @close-form="toggleFormComent" @add-coment="addComent"/>
  <div class="sec-coments">
    <div>
      <h2>Avaliações</h2>

      <div class="stars-coments">
        <p>{{ mediaStars }}</p>
        <div>
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
          </span>
          <p>({{ props.coments.length }} avaliações)</p>
        </div>
      </div>

      <div class="filters">
        <div v-for="i in 5" :key="i">
          <span class="stars" @click="filterComentsFunc(i)">
            <input type="radio" />
            <label class="true"></label>

            <input type="radio" />
            <label :class="i > 1 ? 'true' : ''"></label>

            <input type="radio" />
            <label :class="i > 2 ? 'true' : ''"></label>

            <input type="radio" />
            <label :class="i > 3 ? 'true' : ''"></label>

            <input type="radio" />
            <label :class="i > 4 ? 'true' : ''"></label>
          </span>
        </div>
        <div @click="filterComents = props.coments">Todos</div>
      </div>
      <button @click="toggleFormComent">Adicionar Avaliação</button>
    </div>

    <div class="coments" v-if="filterComents.length > 0">
      <div class="coment" v-for="coment in filterComents" :key="coment.id">
        <h3>{{ coment.title }}</h3>

        <p class="mensagem">
          {{ coment.text }}
        </p>

        <div class="user">
          <img
            src="https://avatars.githubusercontent.com/u/60052506?v=4"
            alt=""
          />

          <p>{{ coment.user.username }} - {{ coment.date }}</p>
        </div>

        <div class="stars-coment">
          <span class="stars">
            <input type="radio" />
            <label class="true"></label>

            <input type="radio" />
            <label :class="coment.stars > 1 ? `true` : ``"></label>

            <input type="radio" />
            <label :class="coment.stars > 2 ? `true` : ``"></label>

            <input type="radio" />
            <label :class="coment.stars > 3 ? `true` : ``"></label>

            <input type="radio" />
            <label :class="coment.stars > 4 ? `true` : ``"></label>
          </span>
        </div>
      </div>
    </div>
    <h2 v-else>Nenhum comentario.</h2>
  </div>
</template>

<style scoped>
.sec-coments {
  display: flex;
  align-items: start;
  justify-content: space-evenly;
  padding: 2% 4%;
  width: 80%;
  background-color: #fff;
  font-size: 1.5rem;
  gap: 20px;
  box-shadow: 0px 1px 20px -9px rgba(52, 71, 52, 1);
  height: 70%;
}

.sec-coments div:nth-child(1) {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stars-coments {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stars-coments p:nth-child(1) {
  font-size: 3.5rem;
  font-weight: bolder;
  color: orange;
}

.stars-coments .stars > label {
  width: 25px;
  height: 25px;
  font-size: 25px;
  align-items: center;
}

.stars-coments p:nth-child(2) {
  font-size: 1.2rem;
  font-weight: 400;
}

.coments {
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 80%;
  overflow-y: auto;
  height: 100%;
  gap: 20px;
  padding: 1%;
}

.coment {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  background-color: var(--cinza);
  border-radius: 5px;
  gap: 20px;
  font-size: 1.5rem;
  padding: 2% 4%;
}

.coment .user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 10px;
  font-size: 1.3rem;
}

.coment .user img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.coment .stars-coment {
  display: flex;
  align-items: start;
  justify-content: center;
  position: absolute;
  top: 8%;
  right: 1.5%;
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.671);
}

.filters {
  display: flex;
  flex-direction: column-reverse;
  align-items: start;
  width: 100%;
  gap: 10px;
  padding: 1%;
}

.filters div {
  display: flex;
  gap: 10px;
  padding: 1% 4%;
  background: var(--cinza);
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.filters div span {
  margin-top: 5%;
  cursor: pointer;
}

.filters div span label {
  cursor: pointer;
}

.sec-coments button {
  width: 200px;
  height: 30px;
  background: var(--lime-green);
  color: #fff;
  border: none;
  border-radius: 3px;
  font-size: 1.5rem;
  font-weight: 400;
  cursor: pointer;
  margin-top: 4%;
}

h2 {
  width: 80%;
  text-align: center;
  padding-top: 3%;
}
</style>
