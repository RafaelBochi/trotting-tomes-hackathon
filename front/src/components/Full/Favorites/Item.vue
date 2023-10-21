<script setup>
import { useRouter } from 'vue-router';
import { computed, ref, onMounted } from 'vue';
import { useOthersStore } from '@/stores/others';
import { useCartStore } from '@/stores/cart';

const othersStore = useOthersStore();
const cartStore = useCartStore();
const router = useRouter();
const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
});

function openBookPage() {
    router.push({ name: 'bookPage', params: { id: props.item.book.id } });
}

const comentsBook = ref([]);

const mediaStars = ref(0)

function format(book) {
  let formated = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
  return formated.format(book)
}

onMounted(async () => {
    comentsBook.value = await othersStore.getComents(props.item.book.id);

    if (comentsBook.value.length > 0) {
        for (let coment of Object.values(comentsBook.value)) {
            mediaStars.value += coment.stars
        }
        mediaStars.value = Math.ceil((mediaStars.value / comentsBook.value.length)).toFixed(1)
    }

    console.log(mediaStars.value)
})
</script>

<template>
    <div class="item">
        <img :src="item.book.capa.file" alt="" @click="openBookPage">

        <div class="info">
            <h3>{{ item.book.title }}</h3>
            <div class="genres">
                <p v-for="(genre, index) in item.book.genre" class="genre" :key="index">
                    {{ genre.name }} <i v-if="index < item.book.genre.length - 1">/</i>
                </p>
            </div>
            <p>{{ format(item.book.price) }}</p>
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

                <p>({{ comentsBook.length }})</p>
            </span>
        </div>

        <span class="delete" @click="$emit('deleteFavorite', item.id)">
            <font-awesome-icon :icon="['fas', 'trash']" />
        </span>

        <div class="addCart" @click="cartStore.addBookCart(item.book.id, 1)">
            <p>
                Adicionar
            </p>
            <font-awesome-icon :icon="['fas', 'cart-plus']" size="lg" style="color: #fff;"/>
        </div>
    </div>
</template>

<style scoped>
.item {
    position: relative;
    display: flex;
    gap: 20px;
    height: 80px;
    width: 100%;
    padding: 1.5% 5%;
    color: #000;
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
}

.item img {
    width: 50px;
    height: 70px;
    cursor: pointer;
}

.item .info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1% 0;
}

.item .info h3 {
    font-size: 1.5rem;
    font-weight: bolder;
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.item .info p {
    font-size: 1.2rem;
}

.item .info .genres {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #999;
}

.item .info .genres p {
    font-size: 1rem;
    display: flex;
    gap: 5px;
}

.item .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.item .delete {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--error-color);
    font-size: 1.3rem;
    right: 10px;
    bottom: 10px;
    cursor: pointer;
    transition: .5s all;
    z-index: 2;
}

.item .delete:hover {
    transform: scale(1.2);
}

.stars {
    display: flex;
    align-items: center;
    position: relative;
    top: 3px;
}

.stars p {
    position: relative;
    top: -1px;
    left: 2px;
}

.stars input {
    display: none;
}

.stars>label {
    width: 15px;
    height: 15px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 15px;
    color: rgb(255, 140, 0);
}

.stars>label::before {
    content: "\2606";
}

.stars>.true::before {
    content: "\2605";
}

.addCart {
    position: absolute;
    right: 30px;
    bottom: 10px;
    cursor: pointer;
    transition: .5s all;
    z-index: 2;
    display: flex;
    background-color: var(--primary-color);
    color: #fff;
    gap: 5px;
    padding: 2px 10px;
    border-radius: 5px;
    font-weight: bold;
}
</style>