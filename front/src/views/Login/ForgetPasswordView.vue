<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const emailInput = ref();

function forgetPassword() {
    const email = {
        "email": `${emailInput.value}`
    };

    userStore.forgetPassword(email);
}
</script>

<template>
    <main>
        <section class="form">
            <i class="iconLock">
                <font-awesome-icon :icon="['fas', 'lock']" size="xl" style="color: #ededed;" />
            </i>

            <div class="title">
                <h2>Esqueceu sua senha?</h2> 
                <p>Informe seu email para recuperar sua senha</p>
            </div>

            <div class="inputEmail">
                <input type="text" required v-model="emailInput">
                <label>Email</label>
                <i class="bar"></i>
                <span class="iconInput">
                    <font-awesome-icon :icon="['fas', 'envelope']" size="xl" class="icon" style="color: var(--primary-color);"/>
                </span>
            </div>

            <button @click="forgetPassword">
                Enviar Email
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
        gap: 40px;
        border-radius: 10px;
        width: 25%;
    }

    .iconLock {
        background-color: var(--primary-color);
        position: absolute;
        padding: 3%;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        top: -10%;
        left: 5%;
    }

    h2 {
        position: relative;
        top: 10%;
        color: var(--primary-color);
        font-size: 2.0rem;
        font-weight: bolder;
        text-transform: uppercase;
    }

    .inputEmail {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 32px;
    }
    .inputEmail input{
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

    .inputEmail label {
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

    .inputEmail .bar {
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: var(--primary-color);
        bottom: 0;
        transition: all 0.5s ease;
        z-index: 1;
    }

    .inputEmail input:focus + label, .inputEmail input:valid + label {
        top: -14px;
        color: var(--primary-color);
    }

    .inputEmail input:focus + label + .bar, .inputEmail input:valid + label + .bar {
        height: 30px;
        border-radius: 10px;
    }

    .inputEmail input:focus ~ .iconInput .fa-envelope, .inputEmail input:valid ~ .iconInput .fa-envelope {
        color: #fff !important;
    }

    button {
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