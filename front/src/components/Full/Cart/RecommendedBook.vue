<script setup>
import { ref, onMounted, computed } from 'vue';
import { useFavoriteStore } from '@/stores/favorite.js';
import { useUserStore } from '@/stores/user.js';
import { useCartStore } from '@/stores/cart.js';
import { useRouter } from 'vue-router';

const favoriteStore = useFavoriteStore();
const userStore = useUserStore();
const cartStore = useCartStore();
const router = useRouter();

const props = defineProps({
    book: {
        type: Object,
        required: true,
    },
});

const book = ref(props.book);

const favorite = computed(()=> {
  if (favoriteStore.favorites.find(item => item.book.id == props.book.id)) {
      return true;
    }
    else {
      return false;
    }
});

function addFavorite() {
    console.log('a')
  if (userStore.loggedIn == true) {
    if (favorite.value != true) {
      favoriteStore.addFavorite(props.book);
      favorite.value = true;
      console.log('add')
    }
    else {
      const id = favoriteStore.favorites.find(item => item.book.id == props.book.id).id;
      console.log(id)
      favoriteStore.deleteFavorite(id);
      favorite.value = false;
      console.log('delete')
    }
  }
  else {
    userStore.popUpLogin = true;
  }
}

function goToBookPage() {
    router.push({ name: 'bookPage', params: { id: props.book.id } });
}

function format(book) {
  let formated = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
  return formated.format(book)
}

onMounted(()=> {
    console.log(props.book)
})
</script>

<template>
    <div class="books">
        <img :src="book.capa.url" :alt="book.title" @click="goToBookPage">
        <div class="info">
            <p class="title">
                {{ book.title }}
            </p>

            <div class="genres">
                <p v-for="(genre, index) in book.genre" class="genre" :key="index">
                    {{ genre.name }} <i v-if="index < book.genre.length - 1">/</i>
                </p>
            </div>

            <p class="priceSale" v-if="book.desconto > 0">
            <p class="realPrice">
                {{ format((Number(book.price / (1 - (Number(book.desconto) / 100)))).toFixed(2)) }}
            </p>
            <p class="discountPrice">
                {{ format(book.price) }}
            </p>
            </p>
            <p class="price" v-else>
                {{ format(book.price) }}
            </p>

            <div class="actions">
                <button @click="cartStore.addBookCart(book.id, 1), $emit('changeRecommendedBooks', book.id)">
                    <p>
                        Adicionar ao carrinho
                    </p>
                </button>

                <span @click="addFavorite">
                    <font-awesome-icon :icon="['fas', 'heart']" class="icon" style="color: var(--primary-color);" v-if="favorite"/>
                    <font-awesome-icon :icon="['fas', 'heart']" class="icon" style="color: #bbb;" v-else/>
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>

.books {
    display: flex;
    flex-direction: row;
    gap: 20px;
    min-width: 280px;
}

.books img {
    width: 100px;
    height: 150px;
    cursor: pointer;
}

.books .info {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    position: relative;
}

.books .info .title {
    font-size: 1.4rem;
    font-weight: bold;
    width: 200px;
    text-overflow: ellipsis;
    text-wrap: nowrap;
    overflow: hidden;
}

.books .info .genres {
    display: flex;
    flex-direction: row;
    gap: 5px;
    flex-wrap: nowrap;
}

.books .info .genres .genre {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--third-color);
    text-wrap: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.books .info .priceSale {
    display: flex;
    flex-direction: column;
    gap: 3px;
}

.books .info .priceSale .realPrice {
    text-decoration: line-through;
    color: var(--primary-color-50);
}

.books .info .priceSale .discountPrice {
    color: var(--primary-color);
    font-size: 1.6rem;
    font-weight: bold;
}

.books .info .price {
    color: var(--primary-color);
    font-size: 1.6rem;
    font-weight: bold;
}

.books .info .actions {
    position: absolute;
    bottom: 10%;
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    align-items: center;
}

.books .info .actions button {
    height: 30px;
    background-color: var(--primary-color);
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    padding: 0 4%;
    cursor: pointer;
    min-width: 180px;
}

.books .info .actions span {
    width: 30px;
    height: 30px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.books .info .actions span .icon {
    color: var(--primary-color);
    font-size: 1.5rem;
}</style>