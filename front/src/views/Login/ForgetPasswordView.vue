<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useGlobalStore } from '@/stores/global'
import router from '@/router'

const userStore = useUserStore()
const globalStore = useGlobalStore()

const emailInput = ref();
const emptyInput = ref(false);

function forgetPassword() {
    if(emailInput.value == '' || emailInput.value == null) {
        globalStore.showMessageModal('Preencha o campo de email...', 'error');
        emptyInput.value = true;
        return;
    }
    const email = {
        "email": `${emailInput.value}`
    };
    userStore.forgetPassword(email);

}

function checkEmptyInput() {
    if(event.target.value.length > 0) {
        emptyInput.value = false;
    }
}
</script>

<template>
    <main>
        <section class="form" id="formTokenPassword">
            <i class="iconLock">
                <font-awesome-icon :icon="['fas', 'lock']" size="xl" style="color: #ededed;" />
            </i>

            <div class="title">
                <h2>Esqueceu sua senha?</h2> 
                <p>Informe seu email para recuperar sua senha</p>
            </div>

            <div class="inputEmail" :class="emptyInput ? 'empty' : ''">
                <input type="text" required v-model="emailInput" @input="checkEmptyInput">
                <label>Email</label>
                <i class="bar"></i>
                <span class="iconInput">
                    <font-awesome-icon :icon="['fas', 'envelope']" size="xl" class="icon" 
                    style="color: var(--primary-color)"/>
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
        background-color: var(--primary-color-50);
        height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
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
        width: 480px;
        height: 520px;
        min-width: 320px;
        min-height: 380px;
        margin: 2%;
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

    .inputEmail {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 40px;
        width: 80%;
        margin: auto;
        left: 10%;
        top: 42%;
    }
    .inputEmail input{
        outline: 0;
        border: none;
        padding: 2%;
        padding-left: 5%;
        padding-right: 13%;
        border-radius: 20px;
        height: 30px;
        font-size: 1.6rem;
        background-color: transparent;
        z-index: 2;
        color: var(--white);
    }

    .inputEmail label {
        top: 11px;
        position: absolute;
        left: 5%;
        transition: all 0.5s ease;
        font-size: 1.2rem;
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
        top: -20px;
        color: var(--primary-color);
    }

    .inputEmail input:focus + label + .bar, .inputEmail input:valid + label + .bar {
        height: 40px;
        border-radius: 10px;
    }

    .inputEmail input:focus ~ .iconInput .fa-envelope, .inputEmail input:valid ~ .iconInput .fa-envelope {
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

    .empty .bar{
        background-color: var(--error-color) !important;
    }

    .empty .iconInput > * {
        color: var(--error-color) !important;
    }
</style>