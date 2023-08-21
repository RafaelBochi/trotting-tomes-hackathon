<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user'
import { useGlobalStore } from '@/stores/global'

const userStore = useUserStore()
const globalStore = useGlobalStore()

const email_or_usernameInput = ref('');
const passwordInput = ref('')

const emptyPassword = ref(false)
const emptyEmailOrUsername = ref(false)

const showPassword = ref(false);

function changeShowPassword() {
    showPassword.value = !showPassword.value;
}

function login() {
    if (email_or_usernameInput.value == '' || email_or_usernameInput.value == null && passwordInput.value == '' || passwordInput.value == null) {
        emptyPassword.value = true;
        emptyEmailOrUsername.value = true;
        globalStore.showMessageModal('Preencha todos os campos', 'error')
        return;
    }

    else if (email_or_usernameInput.value == '' || email_or_usernameInput.value == null) {
        emptyEmailOrUsername.value = true;
        globalStore.showMessageModal('Preencha o campo de email ou username', 'error')
        return;
    }

    else if (passwordInput.value == '' || passwordInput.value == null) {
        emptyPassword.value = true;
        globalStore.showMessageModal('Preencha o campo de senha', 'error')
        return;
    }

    const user = {
        value: `${email_or_usernameInput.value}`,
        password: `${passwordInput.value}`
    }

    userStore.login(user)
}
</script>

<template>
    <section>
        <h2>
            INFORME SEUS DADOS
        </h2>

        <div class="inputs">
            
            <div class="input" :class="emptyEmailOrUsername ? 'empty' : ''">
                <input type="text" required v-model="email_or_usernameInput" @input="emptyEmailOrUsername = false">
                <label>Nome de Usuario ou Email</label>
            </div>
            <div class="input" :class="emptyPassword ? 'empty' : ''">
                <input :type="showPassword ? 'text' : 'password'" required v-model="passwordInput" @input="emptyPassword = false">
                <label>Senha</label>
                <i @click="changeShowPassword">
                    <font-awesome-icon :icon="['fas', 'eye']" size="lg" v-if="showPassword" class="icon"/>
                    <font-awesome-icon :icon="['fas', 'eye-slash']" size="lg" v-else class="icon"/>
                </i>
                <RouterLink to="/forget-password" class="forgetPasswordLink">
                    <p>
                        Esqueceu sua senha?
                    </p>
                </RouterLink>
            </div>

        </div>

        <div class="button">
            <button @click="login">
                Entrar
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
        align-items: center;
        justify-content: center;
        gap: 25px;
        width: 400px;
        min-width: 100px;
    }

    .input {
        position: relative;
        padding: 1%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .input input {
        width: 100%;
        height: 40px;
        padding: 3%;
        border: none;
        outline: none;
        font-size: 1.6rem;
        border-radius: 10px;
        background-color: var(--cinza);
        margin: 0 2%;
    }

    .input label {
        position: absolute;
        left: 15px;
        top: 8px;
        padding: 2%;
        pointer-events: none;
        transition: all 0.5s ease;
        font-size: 1.4rem;
    }


    .input input:focus + label, .input input:valid + label {
        top: -25px;
        left: 2%;
    }

    .input i {
        position: absolute;
        right: 5%;
        cursor: pointer;
    }

    .forgetPasswordLink {
        color: var(--lime-green);
        text-decoration: none;
        font-weight: bolder;
        position: absolute;
        right: 3%;
        bottom: -40%;
        cursor: pointer;
        transition: all .5s;
        font-size: 1.5rem;
    }

    .forgetPasswordLink:hover {
        text-decoration: underline;
    }

    .button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 3%;
    }

    .button button {
        background-color: var(--lime-green);
        padding: 2% 14%;
        border: none;
        color: #fff;
        font-weight: 750;
        letter-spacing: 0.1rem;
        border-radius: 10px;
        cursor: pointer;
        transition: 0.5s all;
        border: 3px solid var(--lime-green);
        font-size: 1.4rem;
        width: 200px;
        height: 40px;
    }

    .button button:hover {
        background-color: transparent;
        color: var(--lime-green);
    }

    .empty label{
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
