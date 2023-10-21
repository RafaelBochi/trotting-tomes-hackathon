<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '@/stores/cart.js';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const router = useRouter();

const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
});

const item = computed(()=> props.item);

function format(book) {
  let formated = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
  return formated.format(book)
}

function goToBookPage() {
    router.push({ name: 'bookPage', params: { id: props.item.livro.id } });
}
</script>

<template>
    <div class="item">
        <img :src="item.livro.capa.file" :alt="item.livro.title" @click="goToBookPage">

        <div class="info">
            <p class="title">
                {{ item.livro.title }}
            </p>

            <div class="genres">
                <p v-for="(genre, index) in item.livro.genre" class="genre">
                    {{ genre.name }} <i v-if="index < item.livro.genre.length - 1">/</i>
                </p>
            </div>

            <p class="priceSale" v-if="item.livro.desconto > 0">
            <p class="realPrice">
                {{ format((Number(item.livro.price / (1 - (item.livro.desconto / 100)))).toFixed(2)) }}
            </p>
            <p class="discountPrice">
                {{ format(item.livro.price) }}
            </p>
            </p>
            <p class="price" v-else>
                {{ format(item.livro.price) }}
            </p>
        </div>

        <div class="actions">
            <div class="quantityActions">
                <button @click="cartStore.changeQuantity(item.id, item, item.livro, 1, item.livro.stock)">
                    <font-awesome-icon :icon="['fas', 'plus']" class="icon" />
                </button>
                <p class="quantity">
                    {{ item.quantidade }}
                </p>
                <button @click="cartStore.changeQuantity(item.id, item, item.livro, -1, item.livro.stock)">
                    <font-awesome-icon :icon="['fas', 'minus']" class="icon" />
                </button>
            </div>

            <button class="delete" @click="cartStore.deleteBookCart(item.id)">
                <font-awesome-icon :icon="['fas', 'trash']" class="icon" />
            </button>
        </div>
    </div>
</template>

<style scoped>
.item {
    width: 40%;
    height: 200px;
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 400px;
}

.item img {
    width: 140px;
    height: 200px;
    cursor: pointer;
}

.item .info {
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 100%;
    gap: 10px;
}

.item .info .title {
    font-size: 1.5rem;
    font-weight: bold;
}

.item .info .genres {
    display: flex;
    flex-direction: row;
    gap: 5px;
}

.item .info .genres .genre {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--third-color);
}

.item .info .priceSale {
    display: flex;
    flex-direction: column;
    gap: 3px;
}

.item .info .priceSale .realPrice {
    text-decoration: line-through;
    color: var(--primary-color-50);
}

.item .info .priceSale .discountPrice {
    color: var(--primary-color);
    font-size: 1.6rem;
    font-weight: bold;
}

.item .info .price {
    color: var(--primary-color);
    font-size: 1.6rem;
    font-weight: bold;
}

.item .actions {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.item .actions button {
    background-color: transparent;
    border: none;
}

.item .actions .quantityActions {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
}

.item .actions .quantityActions button {
    cursor: pointer;
}

.item .actions .quantityActions .quantity {
    font-size: 1.2rem;
    font-weight: bold;
}
</style>