<script setup>
import { ref } from "vue";

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
});

const favorite = ref(false);

function addFavorite() {
  favorite.value = !favorite.value;
}
</script>

<template>
      <span>
        <div class="produto">
          <div>
            <span class="favorite" @click="addFavorite">
              <font-awesome-icon v-if="favorite" :icon="['fas', 'heart']" style="color: var(--lime-green);" class="icon" />
              <font-awesome-icon v-else :icon="['fas', 'heart']"/>
            </span>
            <img :src="book.capa" alt="" />
            <span class="info">
              <p class="title">{{ book.title }}</p>
              <p class="price">{{ book.price }}</p>
            </span>
            <i></i>
          </div>
          <div>
            <button>
              <p>
                Adicionar
              </p>
              <font-awesome-icon
                :icon="['fas', 'cart-arrow-down']"
                style="color: #ffffff"
                size="sm"
              />
            </button>
          </div>
        </div>
      </span>
</template>

<style scoped>
.produto {
  width: 230px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  gap: 20px;
  box-shadow: var(--primary-color) 0px 0px 5px;
}


.produto div:nth-child(1) {
  position: absolute;
  top: 0;
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5%;
  cursor: pointer;
  background-color: transparent;
}

.produto div:nth-child(1) i {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  background-color: #cbced365;
  border-radius: 0 0 100% 0 ;
  width: 0;
  height: 0;
  transition: all .2s;
}

.produto div:nth-child(1):hover i {
  width: 100%;
  height: 100%;
  border-radius: 0;
}

.produto .favorite {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  right: 4%;
  background-color: var(--white);
  border-radius: 50%;
  z-index: 8;
}

.produto .favorite .fa-heart {
  transition: all 0.2s;
  color: #bac2cf;
  
}

.produto .favorite:hover .fa-heart {
  color: var(--lime-green)
}

.produto img {
  z-index: 2;
  position: relative;
  top: -14%;
  right: 5%;
  width: 150px;
  height: 200px;
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
  font-size: 1.2rem;
  font-weight: bolder;
}

.produto div:nth-child(2) {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 15%;
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