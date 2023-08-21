<script setup>

</script>

<template>
    <section class="preloader">
        <img src="/gif-horse-trotting.gif" alt="" class="img-preloader">
    </section>
</template>

<style scoped>
    .preloader {
        width: 100%;
        height: 100%;
        background-color: var(--primary-color);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .img-preloader {
        width: 150px;
    }

</style>