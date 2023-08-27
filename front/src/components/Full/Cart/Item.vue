<script setup>
import { defineProps, onMounted } from 'vue';

const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
});

onMounted(() => {
    console.log(props.item);
})
</script>

<template>
    <div class="item">
        <img :src="item.livro.capa.file" alt="">

        <div class="info">
            <h3>{{ item.livro.title }}</h3>
            <p>Preço: R$ {{ item.livro.price }}</p>
            <p>Estoque: {{ item.livro.stock }}</p>
        </div>

        <div class="actions">
            <button>
                <font-awesome-icon :icon="['fas', 'plus']" @click="$emit('changeQuantity',  item.id, item, item.livro, 1)"/>
            </button>
            <p>{{item.quantidade}}</p>
            <button>
                
                    <font-awesome-icon :icon="['fas', 'minus']" class="icon" @click="$emit('changeQuantity', item.id, item, item.livro, -1)"/>
                
            </button>
        </div>

        <span class="delete" @click="$emit('deleteBookCart', item.id)">
            <font-awesome-icon :icon="['fas', 'trash']" class="icon"/>
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
        min-width: 220px;
        padding: 0 10px;
        color: #fff;
    }

    .item img {
        height: 70px;
        width: 50px;
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
        position: absolute;
        right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        height: 40px;
        font-size: 1.4rem;
    }

    .item .actions button {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        cursor: pointer;
    }

    .item .actions button .icon {
        display: flex;
        align-items: center;
        justify-content: center;
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
    }

    .item .delete:hover {  
        transform: scale(1.2);
    }
</style>