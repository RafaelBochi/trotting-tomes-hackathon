<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useGlobalStore } from '../../stores/global';

const userStore = useUserStore();
const globalStore = useGlobalStore();

const passwordInput = ref('');
const passwordConfirmInput = ref('');
const showPassword = ref('');
const showPasswordConfirm= ref('');

const emptyInputPassword = ref(false);
const emptyInputPasswordConfirm = ref(false);

function changePassword() {
    if(passwordInput.value == '' || passwordConfirmInput == '' ) {
        emptyInputPassword.value = true;
        emptyInputPasswordConfirm.value = true;
        return;
    }

    else if (passwordInput.value == '') {
        emptyInputPassword.value = true;
        return;
    }

    else if (passwordConfirmInput.value == '' || passwordConfirmInput.value == null) {
        emptyInputPasswordConfirm.value = true;
        return;
    }

    if (passwordInput.value != passwordConfirmInput.value) {
        globalStore.showMessageModal('As senhas não coincidem', 'error');
    }
    else {
        userStore.changePassword(passwordInput.value);
    }
}

function checkInput() {
if(event.target.value.length > 0) {
        emptyInputPassword.value = false;
        emptyInputPasswordConfirm.value = false;
    }
}
</script>

<template>
    <main>
        <section class="form">
            <i class="iconLock">
                <font-awesome-icon :icon="['fas', 'lock']" size="xl" style="color: #ededed;" />
            </i>

            <p class="title">
                <h2>Troque sua senha</h2>
            </p>

            <div class="inputPassword" style="top: 32%;" :class="emptyInputPassword ? 'empty' : ''" @input="checkInput">
                <input :type="showPassword ? 'text' : 'password'" required v-model="passwordInput">
                <label>Senha</label>
                <i></i>
                <font-awesome-icon v-if="showPassword" @click="showPassword = !showPassword" :icon="['fas', 'eye']" size="lg" class="icon" style="color: var(--primary-color)"/>
                <font-awesome-icon v-else @click="showPassword = !showPassword" :icon="['fas', 'eye-slash']" size="lg" class="icon" style="color: var(--primary-color)"/>
            </div>

            <div class="inputPassword" style="top: 50%;" :class="emptyInputPasswordConfirm ? 'empty' : ''" @input="checkInput">
                <input :type="showPasswordConfirm ? 'text' : 'password'" required v-model="passwordConfirmInput">
                <label>Confirmar Senha</label>
                <i></i>
                <font-awesome-icon v-if="showPasswordConfirm" @click="showPasswordConfirm = !showPasswordConfirm" :icon="['fas', 'eye']" size="lg" class="icon" style="color: var(--primary-color)"/>
                <font-awesome-icon v-else @click="showPasswordConfirm = !showPasswordConfirm" :icon="['fas', 'eye-slash']" size="lg" class="icon" style="color: var(--primary-color)"/>
            </div>

            <button @click="changePassword">
                Mudar Senha
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

    .inputPassword {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 40px;
        width: 80%;
        margin: auto;
        left: 10%;
    }

    .inputPassword input{
        outline: 0;
        border: none;
        padding: 2%;
        padding-left: 4%;
        padding-right: 12%;
        border-radius: 20px;
        height: 30px;
        font-size: 1.2rem;
        background-color: transparent;
        z-index: 2;
        color: var(--white);
    }

    .inputPassword label {
        top: 11px;
        position: absolute;
        left: 5%;
        transition: all 0.5s ease;
        font-size: 1.2rem;
    }

    .inputPassword i {
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: var(--primary-color);
        bottom: 0;
        transition: all 0.5s ease;
        z-index: 1;
    }

    .inputPassword input:focus + label, .inputPassword input:valid + label {
        top: -20px;
        color: var(--primary-color);
    }

    .inputPassword input:focus + label + i, .inputPassword input:valid + label + i {
        height: 40px;
        border-radius: 10px;
    }

    .inputPassword input:focus ~ .icon, .inputPassword input:valid ~ .icon {
        color: #fff !important;
    }

    .icon {
        position: absolute;
        right: 4%;
        z-index: 2;
        transition: .5s all;
        cursor: pointer;
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

    .empty i{
        background-color: var(--error-color);
    }

    .empty label {
        color: var(--error-color);
    }

    .empty input {
        color: var(--error-color);
    }

    .empty .icon {
        color: var(--error-color) !important;
    }
</style>