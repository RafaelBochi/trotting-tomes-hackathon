<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import router from '../../router'

const userStore = useUserStore()

const tokenInput = ref();

</script>

<template>
    <main>
        <section class="form" id="formTokenPassword">
            <i class="iconLock">
                <font-awesome-icon :icon="['fas', 'lock']" size="xl" style="color: #ededed;" />
            </i>

            <div class="title">
                <h2>Adicione seu token aqui!</h2> 
                <p>Verifique seu email para ver seu token</p>
            </div>

            <div class="inputToken">
                <input type="text" required v-model="tokenInput">
                <label>Token</label>
                <i class="bar"></i>
                <span class="iconInput">
                    <font-awesome-icon :icon="['fas', 'envelope']" size="xl" class="icon" style="color: var(--primary-color);"/>
                </span>
            </div>

            <button @click="forgetPassword">
                Trocar Senha
            </button>
        </section>
    </main>
</template>

<style scoped>
    main {
        position: relative;
        background-color: rgba(0, 0, 0, 0.621);
        height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    img {
        position: absolute;
        height: 100%;
        width: 100%;
        object-fit: cover;
        z-index: -1;
        opacity: 0.5;
    }

    .form {
        position: relative;
        background-color: #fff;
        padding: 1% 4%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        gap: 40px;
        border-radius: 10px;
        max-width: 800px;
        max-height: 600px;
        min-width: 320px;
        min-height: 300px;
    }

    .iconLock {
        background-color: var(--primary-color);
        position: absolute;
        padding: 3%;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        top: -20px;
        left: 5%;
        width: 40px;
        height: 40px;
    }

    .title {
        position: absolute;
        top: 40px;
        width: 100%;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h2 {
        color: var(--primary-color);
        font-size: 2.0rem;
        font-weight: bolder;
        text-transform: uppercase;
    }

    .inputToken {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 32px;
        width: 80%;
        margin: auto;
        left: 10%;
        top: 42%;
    }
    .inputToken input{
        outline: 0;
        border: none;
        padding: 2%;
        padding-left: 5%;
        padding-right: 13%;
        border-radius: 20px;
        height: 30px;
        font-size: 1.2rem;
        background-color: transparent;
        z-index: 2;
        color: var(--white);
    }

    .inputToken label {
        top: 11px;
        position: absolute;
        left: 5%;
        transition: all 0.5s ease;
    }

    .iconInput {
        position: absolute;
        top: 10px;
        right: 5%;
        z-index: 2;
    }

    .iconInput .icon {
        transition: all 0.5s ease;

    }

    .inputToken .bar {
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: var(--primary-color);
        bottom: 0;
        transition: all 0.5s ease;
        z-index: 1;
    }

    .inputToken input:focus + label, .inputToken input:valid + label {
        top: -14px;
        color: var(--primary-color);
    }

    .inputToken input:focus + label + .bar, .inputToken input:valid + label + .bar {
        height: 30px;
        border-radius: 10px;
    }

    .inputToken input:focus ~ .iconInput .fa-envelope, .inputToken input:valid ~ .iconInput .fa-envelope {
        color: #fff !important;
    }

    button {
        position: absolute;
        bottom: 8%;
        left: 15%;
        padding: 2% 0;
        border: none;
        background-color: var(--primary-color);
        border-radius: 20px;
        width: 70%;
        margin: auto;
        color: var(--white);
        font-weight: bolder;
        cursor: pointer;
        border: 2px solid var(--primary-color);
        transition: all 0.5s ease;
        letter-spacing: 0.07rem;
    }

    button:hover {
        background-color: var(--white);
        color: var(--primary-color);
    }
</style>