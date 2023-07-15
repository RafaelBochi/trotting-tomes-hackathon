<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';

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
</script>

<template>
    <div>
        <button @click="previousPage" :disabled="currentPage == 1">
            Previous
        </button>

        <span v-for="page, index in totalPages" :key="index" :class="currentPage == page ? 'true' : ''">
            {{ page }}
        </span>

        <button @click="nextPage" :disabled="currentPage == totalPages">
            Next
        </button>
    </div>
</template>

<style scoped>
    .true {
        color: red;
    }
</style>
