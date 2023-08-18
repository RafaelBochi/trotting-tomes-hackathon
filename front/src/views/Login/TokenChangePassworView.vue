<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useGlobalStore } from '../../stores/global';
import router from '../../router'

const userStore = useUserStore()
const globalStore = useGlobalStore()

const tokenInput = ref();

const inputValues = ref(Array(6).fill(''));

const inputFields = ref([]);

const handleNextInput = (index) => {
    console.log(event.target.value.length)
    const nextIndex = index;
    if (event.target.value.length === 1 && nextIndex < inputValues.value.length) {
        inputFields.value[nextIndex].focus();
    }
    else if(event.target.value.length === 0 && nextIndex > 1){
        inputFields.value[nextIndex - 2].focus()
    }
};

const handleBackInput = (index) => {
    console.log(index)
    if (event.target.value.length === 0 && index > 1) {
        inputFields.value[index - 2].focus()
    }
    else {
        inputFields.value[index - 1].focus()
    }
}



async function checkToken() {
    console.log(inputValues.value)
    for(let value in inputValues.value) {
        if(inputValues.value[value] == '') {
            globalStore.showMessageModal('Preencha todos os campos', 'error');
            return;
        }
    }
    
    tokenInput.value = inputValues.value.join('');
    console.log(await userStore.checkToken(tokenInput.value))
    if(await userStore.checkToken(tokenInput.value)) {
        router.push('/change-password')
    }
    else {
        globalStore.showMessageModal('Token inválido', 'error');
    }
}


onMounted(() => {
    inputFields.value = document.querySelectorAll('.inputToken input');
});
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
                <input type="text" maxlength="1" v-for="i in 6" @input="handleNextInput(i)" @keyup.delete="handleBackInput(i)" @paste="copyCode" v-model="inputValues[i - 1]"> 
            </div>

            <button @click="checkToken">
                Trocar Senha
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

    .inputToken {
        position: absolute;
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: 32px;
        width: 100%;
        top: 42%;
        gap: 10px;
        left: 0;
    }
    .inputToken input{
        outline: 0;
        border: none;
        height: 50px;
        font-size: 3.2rem;
        background-color: transparent;
        border-bottom: 1px solid #000;
        z-index: 2;
        color: #000;
        width: 10%;
        text-align: center;
    }

    .inputToken label {
        top: 11px;
        position: absolute;
        left: 5%;
        transition: all 0.5s ease;
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