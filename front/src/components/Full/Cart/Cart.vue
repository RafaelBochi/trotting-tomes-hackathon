<script setup>
import Item from './Item.vue';
import { useUserStore } from '@/stores/user.js';
import { computed } from 'vue';

const userStore = useUserStore();

const booksCart = computed(() => userStore.booksCart);

function deleteBookCart(id) {
  userStore.deleteBookCart(id);
}
</script>

<template>
  <section class="cart">
    <h2>Carrinho de Itens</h2>

    <div class="itens" v-if="booksCart.length > 0">
        <item v-for="item in booksCart" :key="item.id" :item="item" @delete-book-cart="deleteBookCart"/>
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
.cart {
  width: 30%;
  height: 100%;
  background-color: #fff;
  position: fixed;
  right: 0;
  z-index: 10;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 1%;
  animation: cart 0.5s forwards;
}

@keyframes cart {
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

.close {
  position: absolute;
  top: 3%;
  right: 3%;
  cursor: pointer;
}
</style>
