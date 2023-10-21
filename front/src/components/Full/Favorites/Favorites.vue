<script setup>
import Item from './Item.vue';
import { computed } from 'vue';
import { useFavoriteStore } from '@/stores/favorite'

const favoriteStore = useFavoriteStore();

const favorites = computed(() => favoriteStore.favorites);



function deleteFavorite(id) {
  favoriteStore.deleteFavorite(id);
} 
</script>

<template>
  <section class="favorites">
    <h2>Seus Favoritos</h2>

    <div class="itens" v-if="favorites.length > 0">
        <item v-for="item in favorites" :key="item.id" :item="item" @delete-favorite="deleteFavorite"/>
    </div>

    <h3 v-else>
      NENHUM ITEM ADICIONADO...
    </h3>

    <span class="close" @click="$emit('close')">
      <font-awesome-icon :icon="['fas', 'xmark']" size="xl"/>
    </span>
  </section>
</template>

<style scoped>
.favorites {
  max-width: 380px;
  min-width: 200px;
  width: 400px;
  height: 100%;
  background-color: #fff;
  position: fixed;
  right: 0;
  z-index: 9;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 1%;
  animation: favorite 0.5s forwards;
  padding: 10px 20px;
}

@keyframes favorite {
  0%  {
    right: -30%;
  }

  100% {
    right: 0;
  }
}

h2 {
  font-size: 2rem;
  font-weight: bolder;
  text-transform: uppercase;
  color: var(--primary-color);
  padding: 0% 2%;
  margin-bottom: 20px;
}

.itens {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    height: 80%;
    overflow-y: auto;
    padding: 0% 2%;
}

.close {
  position: absolute;
  top: 3%;
  right: 3%;
  cursor: pointer;
}

@media screen and (max-width: 620px) {
  .favorites {
    top: 105px;
    padding-top: 10px;
  }
}
</style>
