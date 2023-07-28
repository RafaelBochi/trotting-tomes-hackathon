<script setup>

const props = defineProps({
  startIndex: {
    type: Number,
    required: true
  },
  endIndex: {
    type: Number,
    required: true
  },
  books: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['next-book', 'previous-book']);

const previousBook = () => {
    emit('previous-book');
};

const nextBook = () => {
    emit('next-book');
};

</script>

<template>
    <div>
        <button @click="previousBook" :disabled="startIndex == 0">
            <font-awesome-icon :icon="['fas', 'chevron-left']" />
        </button>

        <button @click="nextBook" :disabled="endIndex == books.length">
            <font-awesome-icon :icon="['fas', 'chevron-right']" />
        </button>
    </div>
</template>

<style scoped>
    div {
        position: absolute;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        top: 45%;
        z-index: 5;
    }

    button {
        border: none;
        background-color: transparent;
        cursor: pointer;
    }
</style>