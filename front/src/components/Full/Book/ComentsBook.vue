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

const filterComents = ref();
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
}

const showComents = ref(true)

function filterComentsFunc(stars) {
  console.log(filterComents.value)
  filterComents.value = [];
  if(stars == 0) filterComents.value = props.coments;
  else filterComents.value = props.coments.filter(coment => coment.stars === stars);
  if (filterComents.value.length == 0) showComents.value = false;
  else showComents.value = true;
  console.log(filterComents.value)
}

function toggleFormComent() {
  if (userStore.loggedIn) {
    showFormComent.value = !showFormComent.value;
  } else {
    userStore.popUpLogin = true;
  }
}

onMounted(()=> {
  setTimeout(()=> {
    if(props.coments.length == 0) showComents.value = false;
  else showComents.value = true;
  filterComents.value = props.coments;
  }, 500)
  
})
</script>

<template>
  <FormComent v-if="showFormComent" @close-form="toggleFormComent" @add-coment="addComent"/>
  <div class="sec-coments">
    <div class="secInfos">
      <div class="title">
        <h2>Avaliações</h2>
        <button @click="toggleFormComent">Adicionar Avaliação</button>
      </div>

      <div class="info">
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

        <div @click="filterComentsFunc(0)">Todos</div>
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
      </div>
      </div>
    </div>

    <div class="coments" v-if="showComents">
      <div class="coment" v-for="coment in filterComents" :key="coment.id">
        <h3>{{ coment.title }}</h3>

        <p class="mensagem">
          {{ coment.text }}
        </p>

        <div class="user">
          <img
            src="/userIcon.png"
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
    <h2 class="commentEmpty" v-else>Nenhum comentario.</h2>
  </div>
</template>

<style scoped>
.sec-coments {
  display: flex;
  align-items: start;
  justify-content: space-evenly;
  padding: 4% 4%;
  width: 100%;
  min-width: 320px;
  background-color: #fff;
  font-size: 1.5rem;
  gap: 20px;
  box-shadow: 0px 1px 20px -9px rgba(52, 71, 52, 1);
  height: 100%;
  min-height: 500px;
}


.secInfos {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: space-around;
  min-width: 300px;
}

.secInfos .title {
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
}

.secInfos .info {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin: auto;
  width: 100%;
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
  min-width: 320px;
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
  min-width: 220px;

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
  flex-direction: column;
  width: 100%;
  gap: 10px;
  padding: 1%;
  align-items: start;
  height: 40px;
  min-width: 300px;
  margin: auto;
}

.filters::-webkit-scrollbar {
  height: 5px;
  width: 100%;
}

.filters::-webkit-scrollbar-track {
  background: var(--cinza);
  border-radius: 2px;
}

.filters::-webkit-scrollbar-thumb {
  background: var(--lime-green);
  border-radius: 2px;
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
  height: 40px;
}

.filters div span {
  margin-top: 10px;
  cursor: pointer;
}

.filters div span label {
  cursor: pointer;
}

.sec-coments button {
  width: 150px;
  height: 30px;
  background: var(--lime-green);
  color: #fff;
  border: none;
  border-radius: 3px;
  font-size: 1.5rem;
  font-weight: 400;
  cursor: pointer;
}

.commentEmpty {
  width: 80%;
  text-align: center;
}
</style>
