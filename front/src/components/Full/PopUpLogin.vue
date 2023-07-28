<script setup>
import router from '@/router';
import { useUserStore } from '../../stores/user';

const userStore = useUserStore();

function close() {
    userStore.popUpLogin = false;
}

function next() {
    router.push('/login')
    userStore.popUpLogin = false;
}
</script>

<template>
    <section>
    <span class="form">
        <p>Faça Login para continuar</p>

        <div>
            <button class="cancel" @click="close">
            <p>
                Cancelar
            </p>
            </button>

            <button class="next" @click="next">
                <p>
                Fazer Login
                </p>
            </button>
        </div>

        
    </span>
</section>
</template>

<style scoped> 

section {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(2px);
    background-color: rgba(0, 0, 0, 0.392);
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
}
    .form {
        width: 25vw;
        height: 10vw;
        background-color: #fff;
        z-index: 99;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        border-radius: 5px;
        padding: 0 2%;
    }

    .form > p {
        font-size: 1.8rem;
        font-weight: bold;
        color: var(--primary-color);
    }

    .form > div {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }

    button {
        width: 35%;
        height: 2.2vw;
        border: none;
        border-radius: 5px;
        color: #fff;
        font-size: 1.2rem;
        font-weight: bold;
        cursor: pointer;
    }

    .cancel {
        background-color: #a30a0a;
    }

    .next {
        background-color: var(--lime-green);
    }
</style>