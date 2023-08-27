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
            <font-awesome-icon :icon="['fas', 'circle-exclamation']" shake size="2xl" style="color: var(--primary-color)" class="warning"/>
            <p>Faça Login para continuar</p>
            <div>
                <button class="cancel" @click="close">
                    <p>
                        Cancelar
                    </p>
                </button>

                <button class="next" @click="next">
                    <p>
                        Login
                    </p>
                </button>
            </div>


        </span>
    </section>
</template>

<style scoped> section {
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

     min-width: 250px !important;
     min-height: 150px !important;
     background-color: #fff;
     z-index: 99;
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: space-evenly;
     border-radius: 5px;
     padding: 0 2%;
 }

 .form>p {
     font-size: 1.8rem;
     font-weight: bold;
     color: var(--primary-color);
 }

 .form>div {
     width: 100%;
     display: flex;
     align-items: center;
     justify-content: space-evenly;
 }

 .warning {
    font-size: 40px;
 }

 button {
     width: 75px;
     height: 30px;
     border: none;
     border-radius: 5px;
     color: #fff;
     font-size: 1.2rem;
     font-weight: bold;
     cursor: pointer;
 }

 .cancel {
     background-color: transparent;
     border: 2px solid var(--error-color);
     color: var(--error-color);
 }

 .next {
     background-color: var(--primary-color);
 }
</style>