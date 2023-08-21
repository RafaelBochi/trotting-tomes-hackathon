<script setup>
import { ref } from 'vue';
import { useUserStore } from '../../../stores/user';
import { useGlobalStore } from '../../../stores/global';

const userStore = useUserStore();
const globalStore = useGlobalStore();

const usernameInput = ref('');
const emailInput = ref('');
const passwordInput = ref('');

const emptyPassword = ref(false);
const emptyEmail = ref(false);
const emptyUsername = ref(false);

const showPassword = ref(false);

function changeShowPassword() {
    showPassword.value = !showPassword.value;
}

function register() {
    if (usernameInput.value == '' || usernameInput.value == null && emailInput.value == '' || emailInput.value == null && passwordInput.value == '' || passwordInput.value == null) {
        emptyPassword.value = true;
        emptyEmail.value = true;
        emptyUsername.value = true;
        globalStore.showMessageModal('Preencha todos os campos', 'error')
        return;
    }

    else if (usernameInput.value == '' || usernameInput.value == null && emailInput.value == '' || emailInput.value == null) {
        emptyEmail.value = true;
        emptyUsername.value = true;
        globalStore.showMessageModal('Preencha o campo de email e username', 'error')
        return;
    }

    else if (usernameInput.value == '' || usernameInput.value == null && passwordInput.value == '' || passwordInput.value == null) {
        emptyPassword.value = true;
        emptyUsername.value = true;
        globalStore.showMessageModal('Preencha o campo de senha e username', 'error')
        return;
    }

    else if (emailInput.value == '' || emailInput.value == null && passwordInput.value == '' || passwordInput.value == null) {
        emptyPassword.value = true;
        emptyEmail.value = true;
        globalStore.showMessageModal('Preencha o campo de senha e email', 'error')
        return;
    }

    else if (usernameInput.value == '' || usernameInput.value == null) {
        emptyUsername.value = true;
        globalStore.showMessageModal('Preencha o campo de username', 'error')
        return;
    }

    else if (emailInput.value == '' || emailInput.value == null) {
        emptyEmail.value = true;
        globalStore.showMessageModal('Preencha o campo de email', 'error')
        return;
    }

    else if (passwordInput.value == '' || passwordInput.value == null) {
        emptyPassword.value = true;
        globalStore.showMessageModal('Preencha o campo de senha', 'error')
        return;
    }

    const user = {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    };

    userStore.register(user);
}
</script>

<template>
    <section>
        <h2>
            CRIE SUA CONTA
        </h2>

        <div class="inputs">
            
            <div class="input" :class="emptyUsername ? 'empty' : ''">
                <input type="text" required v-model="usernameInput" @input="emptyUsername = false">
                <label>Nome de Usuario</label>
            </div>
            <div class="input" :class="emptyEmail ? 'empty' : ''">
                <input type="email" required v-model="emailInput" @input="emptyEmail = false">
                <label>Email</label>
            </div>
            <div class="input"  :class="emptyPassword ? 'empty' : ''">
                <input :type="showPassword ? 'text' : 'password'" required v-model="passwordInput" @input="emptyPassword = false">
                <label>Senha</label>
                <i @click="changeShowPassword">
                    <font-awesome-icon :icon="['fas', 'eye']" size="lg" v-if="showPassword" class="icon"/>
                    <font-awesome-icon :icon="['fas', 'eye-slash']" size="lg" v-else class="icon"/>
                </i>
            </div>

        </div>

        <div class="button">
            <button @click="register">
                Registrar-se
            </button>
        </div>
    </section>
</template>

<style scoped>
    section {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        width: 60%;
        right: 0;
    }

    h2 {
        position: relative;
        font-family: 'Roboto', sans-serif;
        letter-spacing: 0.1rem;
        font-weight: bolder;
        font-size: 2.2rem;
        margin-bottom: 20px;
    }

    .inputs {
        display: flex;
        flex-direction: column;
        gap: 18px;
        width: 400px;
    }

    .input {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1%;
        width: 100%;
    }

    .input input {
        width: 100%;
        height: 40px;
        padding: 3%;
        border: none;
        outline: none;
        font-size: 1.6rem;
        border-radius: 10px;
    }

    .input label {
        position: absolute;
        top: 7px;
        left: 2%;
        padding: 2%;
        pointer-events: none;
        transition: all 0.5s ease;
        font-size: 1.4rem;
    }
    .input input:focus + label, .input input:valid + label {
        top: -20px;
        left: 2%;
    }

    .input i {
        position: absolute;
        right: 5%;
        cursor: pointer;
    }
    .button {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .button button {
        background-color: var(--primary-color);
        padding: 2% 14%;
        border: none;
        color: #fff;
        font-weight: 750;
        letter-spacing: 0.1rem;
        border-radius: 10px;
        cursor: pointer;
        transition: 0.5s all;
        border: 3px solid var(--primary-color);
        font-size: 1.4rem;
        width: 200px;
        height: 40px;
    }

    .button button:hover {
        background-color: transparent;
        color: var(--primary-color);
    }

    .empty label {
        color: var(--error-color);
    }

    .empty .icon {
        color: var(--error-color);
    }

    @media screen and (max-width: 1000px) {

.inputs {
   width: 350px !important;
}
}
</style>
