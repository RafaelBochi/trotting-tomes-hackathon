<script setup>

const props = defineProps({
  active: {
    type: Number,
    required: true
  },
  itemsPerPage: {
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
    console.log(props.itemsPerPage, props.active)
    emit('next-book');
};

</script>

<template>
    <div>
        <button @click="previousBook" :disabled="active == 0">
            <font-awesome-icon :icon="['fas', 'chevron-left']" />
        </button>

        <button @click="nextBook" :disabled="active >= books.length - itemsPerPage">
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