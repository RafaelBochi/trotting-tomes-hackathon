<script setup>
import { ref } from 'vue'
import { useUserStore } from '../../stores/user';
import { useGlobalStore } from '../../stores/global';
import axios from 'axios';

const globalStore = useGlobalStore();

const userStore = useUserStore()

const inputName = ref(userStore.user.username)
const inputEmail = ref(userStore.user.email)
const inputPassword = ref('')
const inputPasswordConfirm = ref('')
const imageInput = ref(null)

async function loadImage(e) {
    const formData = new FormData();
    const selectedFile = e.target.files[0];
    formData.append('image', selectedFile );
    const config = {
            headers: { Authorization: `Bearer ${userStore.user.token}`,  
            'Content-Type': 'multipart/form-data'}
            
        };
        const { data } = await axios.post("/api/profileImages/", {
            url: formData,
            user: userStore.user.id,
            name: userStore.user.name + userStore.user.id,
        }, config ).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    imageInput.value = formData;
}

function verificationInputs() {
    if (inputPassword.value != inputPasswordConfirm.value) {
        globalStore.showMessageModal('As senhas não coincidem', 'error');
        return false;
    }
    return true;
}

const editAccount = () => {
    if (!verificationInputs()) return;
    const values = {
        username: inputName.value,
        email: inputEmail.value,
        password: inputPassword.value,
    }
    userStore.editAccount(values, imageInput.value);
    console.log(imageInput.value)
}
</script>

<template>
    <section>
        <aside>
            <div class="links">
                <span class="editAccount">
                    <p>
                        Editar Conta
                    </p>
                    <font-awesome-icon :icon="['fas', 'user']" size="lg" />
                </span>

                <span class="settings">
                    <p>
                        Configurações
                    </p>
                    <font-awesome-icon :icon="['fas', 'gear']" size="lg" />
                </span>

                <span class="exit">
                    <p>
                        Sair
                    </p>
                    <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" size="lg" />
                </span>
            </div>
        </aside>

        <div class="contentEditAccount">
            <h2>Edite Sua Conta</h2>
            <div class="form">
                <div class="userImg">
                    <img :src="imageInput != '' ? imageInput : userStore.user.image" alt="">

                    <label for="imageInput" >
                        <font-awesome-icon :icon="['fas', 'camera']" size="xl" />
                    </label>

                    <input id="imageInput" type="file" accept="image/*" @change="loadImage">
                </div>

                <div class="inputs">
                    <div class="inputName">
                        <input type="text" required v-model="inputName">
                        <label>Nome de Usuario</label>
                    </div>

                    <div class="inputEmail">
                        <input type="email" required v-model="inputEmail">
                        <label>Email</label>
                    </div>

                    <div class="inputPassword">
                        <input type="password" required v-model="inputPassword">
                        <label>Senha</label>
                    </div>

                    <div class="inputPasswordConfirm">
                        <input type="password" required v-model="inputPasswordConfirm">
                        <label>Confirmar Senha</label>
                    </div>
                </div>


            </div>
            <div class="actions">
                <button class="confirm" @click="editAccount">
                    Confirmar
                </button>
                <button class="cancel">
                    Cancelar
                </button>
            </div>
        </div>
    </section>
</template>

<style scoped>
section {
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;

}

aside {
    position: relative;
    width: 300px;
    height: 100%;
    border-right: 5px solid var(--primary-color);
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
}

aside .links {
    display: flex;
    flex-direction: column;
    gap: 80px;
    font-size: 2.0rem;
    width: 95%;
    color: #fff;
}

aside .links span {
    display: flex;
    gap: 10px;
    background-color: var(--primary-color);
    padding: 10px 20px;
    align-items: center;
    justify-content: center;
    border-radius: 10px 0px 0px 10px;
    cursor: pointer;
}

aside .links .exit {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: transparent;
    color: #000;
}


.contentEditAccount {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: calc(100% - 300px);
    gap: 50px;
}

.contentEditAccount h2 {
    font-size: 2.5rem;
    font-weight: bolder;
    color: var(--primary);
    margin-bottom: 30px;
}

.contentEditAccount .form {
    display: flex;
    align-items: center;
    gap: 100px;
}

.contentEditAccount .form .userImg {
    position: relative;
    width: 200px;
    height: 200px;
}
.contentEditAccount .form .userImg img {
    width: 200px;
    height: 200px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    object-fit: fill;
    border-radius: 50%;
}
.contentEditAccount .form .userImg label {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 0%;
    right: 0;
    width: 50px;
    height: 50px;
    border: none;
    outline: none;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: #fff;
    cursor: pointer;
    transition: all .5s ease;
    font-size: 1.5rem;
}

.contentEditAccount .form .userImg input {
    display: none;
}


.contentEditAccount .form .inputs {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: center;
    align-items: center;
}

.contentEditAccount .form .inputs > div {
    position: relative;
    display: flex;
    align-items: center;
    background-color: var(--cinza);
    border-radius: 10px;
}

.contentEditAccount .form .inputs input {
    width: 300px;
    height: 40px;
    outline: none;
    border: none;
    padding: 0px 15px;
    font-size: 1.5rem;
    font-weight: bolder;
    background-color: transparent;
    z-index: 2;
}

.contentEditAccount .form .inputs div label {
    position: absolute;
    left: 15px;
    font-size: 1.5rem;
    z-index: 1;
    transition: all .5s;
}

.contentEditAccount .form .inputs input:focus + label, .contentEditAccount .form .inputs input:valid + label {
    transform: translateY(-30px);
}

.contentEditAccount .actions {
    display: flex;
    gap: 50px;
}

.contentEditAccount .actions button {
    width: 200px;
    height: 40px;
    border: none;
    outline: none;
    border-radius: 10px;
    font-size: 1.5rem;
    font-weight: bolder;
    cursor: pointer;
}

.contentEditAccount .actions .confirm {
    background-color: var(--success-color);
    color: #fff;
}

.contentEditAccount .actions .cancel {
    border: var(--error-color) 2px solid;
    color: var(--error-color);
    background-color: #fff;
}
</style>