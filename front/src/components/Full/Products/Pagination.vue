<script setup>
import { ref, computed, defineEmits } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['page-change']);

const previousPage = () => {
  if (props.currentPage > 1) {
    emit('page-change', props.currentPage - 1);
  }
};

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('page-change', props.currentPage + 1);
  }
};

const pageChange = (page) => {
  emit('page-change', page);
};
</script>

<template>
    <div>
        <button @click="previousPage" :disabled="currentPage == 1">
            <font-awesome-icon :icon="['fas', 'chevron-left']" />
        </button>

        <span v-for="page, index in totalPages" :key="index" :class="currentPage == page ? 'activate' : ''" class="pages" @click="pageChange(page)">
            <p>{{ page }}</p>
        </span>

        <button @click="nextPage" :disabled="currentPage == totalPages">
            <font-awesome-icon :icon="['fas', 'chevron-right']" />
        </button>
    </div>
</template>

<style scoped>
    div {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-top: 50px;
    }
    .pages {
        font-size: 1.7rem;
        padding: 2%;
        height: 40px;
        width: 40px;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--cinza);
        font-weight: bolder;
        cursor: pointer;
    }
    .activate {
        background-color: #91c36a9c;
        color: #344734;
    }

    button {
        outline: 0;
        cursor: pointer;
        border: none;
        border-radius: 100%;
        width: 40px;
        height: 40px;
        margin: 0 1%;
    }
</style>
