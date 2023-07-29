<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <div class="item">
        <img :src="item.livro.capa" alt="">

        <div class="info">
            <h3>{{ item.livro.title }}</h3>
            <p>Preço: R$ {{ item.livro.price }}</p>
            <p>Estoque: {{ item.livro.stock }}</p>
        </div>

        <div class="actions">
            <button>+</button>
            <p>1</p>
            <button>-</button>
        </div>

        <span class="delete" @click="$emit('deleteBookCart', item.id)">
            Delete
        </span>
    </div>
</template>

<style scoped>
    .item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 10px;
        height: 80px;
        width: 100%;
        background: var(--lime-green);
    }

    .item img {
        height: 70px;
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
        color: #000;
        font-size: 1.3rem;
        right: 2%;
        bottom: 1%;
        cursor: pointer;
    }
</style>