<script setup>
import { useRouter } from 'vue-router';

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
</script>

<template>
    <div class="item">
        <img :src="item.book.capa.file" alt="" @click="openBookPage">

        <div class="info">
            <h3>{{ item.book.title }}</h3>
            <p>Preço: R$ {{ item.book.price }}</p>
            <p>Estoque: {{ item.book.stock }}</p>
        </div>

        <span class="delete" @click="$emit('deleteFavorite', item.id) ">
            <font-awesome-icon :icon="['fas', 'trash']" />
        </span>
    </div>
</template>

<style scoped>
    .item {
        position: relative;
        display: flex;
        align-items: center;
        gap: 40px;
        height: 80px;
        width: 100%;
        background: var(--primary-color);
        padding: 1% 5%;
        color: #fff;
        cursor: pointer;
    }

    .item img {
        height: 70px;
        cursor: pointer;
    }

    .item .info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 5px;
    }

    .item .info h3 {
        font-size: 1.5rem;
        font-weight: bolder;
    }

    .item .info p {
        font-size: 1.2rem;
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
</style>