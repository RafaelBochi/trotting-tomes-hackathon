<script setup>
import { useUserStore } from '../../../stores/user';
import { ref, computed } from 'vue';

const userStore = useUserStore()

const inputUsername = computed(()=> userStore.user.username)
const inputEmail = computed(()=> userStore.user.email)
const inputPassword = ref('')

function editAccount() {
    const user = {
        username: inputUsername.value,
        email: inputEmail.value,
        password: inputPassword.value
    }

    userStore.editAccount(user)
}
</script>

<template>
    <section>
        <span class="close" @click="$emit('toggleAccount')">
            <font-awesome-icon :icon="['fas', 'arrow-right']" class="icon" size="2xl" style="color: #000"/>
        </span>

        <div class="img">
            <span>
                <font-awesome-icon :icon="['fas', 'camera']" class="icon" size="2xl" style="color: #fff"/>
            </span>
            <img src="/userIcon.png" alt="">
        </div>

        <div class="form">
            <h2>
                Edite seu Perfil
            </h2>

            <div class="inputs">
                
                <div class="inputName">
                    <input type="text" v-model="inputUsername" required>
                    <label>Nome de Usuario</label>
                    <i></i>
                </div>

                <div class="inputEmail">
                    <input type="text" v-model="inputEmail" required>
                    <label>Email</label>
                    <i></i>
                </div>

                <div class="inputPassword">
                    <input type="password" v-model="inputPassword" required>
                    <label>Senha</label>
                    <i></i>
                </div>
            </div>

            <div class="actions">
                <button class="btn btn-danger" @click="$emit('toggleAccount')">Cancelar</button>
                <button class="btn btn-success" @click="editAccount">Salvar</button>
            </div>
        </div>
    </section>
</template>

<style scoped>
    section {
        position: absolute;
        top: 9%;
        left: 0;
        width: 100%;
        height: 91%;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        z-index: 9;
    }

    .img {
        position: relative;
        width: 25%;
    }

    img {
        width: 100%;
    }

    .img span {
        width: 10%;
        height: 5%;
        position: absolute;
        bottom: 7%;
        left: 75%;
        background-color: var(--lime-green);
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        cursor: pointer;
    }

    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        height: 50%;
        width: 30%;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }

    h2 {
        font-size: 2rem;
        font-weight: bolder;
        color: var(--lime-green);
        text-transform: uppercase;
    }

    .inputs {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        height: 50%;
        width: 80%;
    }

    .inputs > div {
        position: relative;
        width: 80%;
        height: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .inputs > div > input {
        width: 100%;
        height: 30px;
        border: none;
        outline: none;
        font-size: 1.2rem;
        font-weight: bolder;
        background: transparent;
        padding: 2%;
    }

    .inputs > div > label {
        position: absolute;
        left: 2%;
        font-weight: bolder;
        color: #000;
        transition: all .5s ease;
    }

    .inputs > div > input:focus ~ label, .inputs > div > input:valid ~ label {
        transform: translateY(-20px);
        font-size: 1rem;
        color: var(--lime-green);
    }

    .inputs > div > i {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 2px;
        background-color: var(--lime-green);
        transition: all .3s ease;
    }

    .actions {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 80%;
    }

    .actions button {
        width: 30%;
        height: 30px;
        border: none;
        outline: none;
        font-size: 1.5rem;
        font-weight: bolder;
        color: #fff;
        background-color: var(--lime-green);
        border-radius: 10px;
        cursor: pointer;
    }

    .actions button:nth-child(1) {
        background-color: transparent;
        border: 2px solid var(--lime-green);
        color: var(--lime-green);
    }

    .close {
        position: absolute;
        left: 2%;
        top: 2%;
        transform: rotate(180deg);
        cursor: pointer;
    }
</style>