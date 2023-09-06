<script setup>
import Item from './Item.vue';
import { useUserStore } from '@/stores/user.js';
import { useCartStore } from "@/stores/cart"
import { computed, onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const userStore = useUserStore();
const cartStore = useCartStore();

const booksCart = computed(() => cartStore.booksCart);

function deleteBookCart(id) {
  cartStore.deleteBookCart(id);
}

function changeQuantity(id, item, book, quantidade) {
  console.log(id)
  if (item.quantidade == 1 && quantidade == -1) return;
  else if (item.quantidade == book.stock && quantidade == 1) return;
  cartStore.changeQuantity(id, item, book, quantidade);
}

const heightHeader = ref(0);

function getHeigthHeader() {
  const header = document.querySelector('header');
  const searchResponsive = document.querySelector('.searchResponsive');
  if (header && searchResponsive) {
    heightHeader.value = header.offsetHeight + searchResponsive.offsetHeight;
    const cart = document.querySelector('.cart');
    if (cart) {
      cart.style.top = `${heightHeader.value}px !important`;
      cart.style.height = `calc(100% - ${heightHeader.value}px) !important`;
    }
  }
  else if (header) {
    heightHeader.value = header.offsetHeight;
    const cart = document.querySelector('.cart');
    if (cart) {
      cart.style.top = `${heightHeader.value}px !important`;
      cart.style.height = `calc(100vh - ${heightHeader.value}px) !important`;
    }
  }
}

window.addEventListener('resize', getHeigthHeader);

onMounted(() => {
  getHeigthHeader();
})
</script>

<template>
  <section class="cart">
    <h2>Carrinho de Itens</h2>

    <div class="itens" v-if="booksCart.length > 0">
      <item v-for="item in booksCart" :key="item.id" :item="item" @delete-book-cart="deleteBookCart"
        @change-quantity="changeQuantity" />
    </div>

    <h3 v-else>
      NENHUM ITEM ADICIONADO...
    </h3>

    <span class="close" @click="$emit('close')">
      <font-awesome-icon :icon="['fas', 'xmark']" size="xl" />
    </span>

    <div class="buyButton">
      <button>
        <router-link to="/comprar">
          <button @click="">Comprar (R$ {{ cartStore.cart.total }})</button>
        </router-link>
      </button>
    </div>
  </section>
</template>

<style scoped>
.cart {
  max-width: 400px;
  min-width: 200px;
  width: 400px;
  background-color: #fff;
  position: fixed;
  height: calc(100vh - 60px);
  right: 0;
  z-index: 10;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 1% 10px;
  animation: cart 0.5s forwards;
}

@keyframes cart {
  0% {
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
  .cart {
    top: 105px;
    padding-top: 10px;
  }
}

.buyButton {
  position: absolute;
  bottom: 0%;
  height: 70px;
  width: 100%;
  padding: 25px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin-bottom: 10px;
}

.buyButton button {
  width: 80%;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: var(--primary-color);
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
</style>
