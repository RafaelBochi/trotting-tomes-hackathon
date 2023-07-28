<script setup>
import Item from './Item.vue';
import { useUserStore } from '@/stores/user.js';
import { computed } from 'vue';

const userStore = useUserStore();

const favorites = computed(() => userStore.favorites);
</script>

<template>
  <section class="cart">
    <h2>Carrinho de Itens</h2>

    <div class="itens">
        <item v-for="item in favorites" :key="item.id" :item="item"/>
    </div>
  </section>
</template>

<style scoped>
.cart {
  width: 30%;
  height: 100%;
  background-color: #fff;
  position: fixed;
  right: 0;
  z-index: 10;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 1%;
}

h2 {
  font-size: 2rem;
  font-weight: bolder;
  text-transform: uppercase;
  color: var(--lime-green);
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
</style>
