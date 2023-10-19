<script setup>

import { ref } from 'vue'

const placeholderNumeroCartao = ref('')

const securityCode = ref()

const CEP = ref()

function verifyCode() {
    if(securityCode.value.toString().length > 3) {
        securityCode.value = securityCode.value.toString().slice(0, 3)
    }
}

function verifyCEP() {
    if(CEP.value.toString().length > 8) {
        CEP.value = CEP.value.toString().slice(0, 8)
    }
}
</script>

<template>
    <div class="informacoes">
        <h2>Adicione os detalhes do pagamento</h2>
        <div class="input">
            <input type="text" required :placeholder=placeholderNumeroCartao @focus="placeholderNumeroCartao = '1234 1234 1234 1234'" @focusout="placeholderNumeroCartao = ''">
            <label>Número do Cartão</label>
        </div>
        <div class="input">
            <input type="date" required>
            <label>Data de Validade</label>
        </div>
        <div class="input">
            <input type="number" v-model="securityCode" @input="verifyCode()" required>
            <label>Código de Segurança (CVV/CVC)</label>
        </div>
        <div class="input">
            <input type="text" required>
            <label>Nome do Titular do Cartão</label>
        </div>
        <div class="input">
            <input type="text" required>
            <label>Endereço de Cobrança</label>
        </div>
        <div class="input">
            <input type="number" @input="verifyCEP()" v-model="CEP" required>
            <label>CEP</label>
        </div>
        <div class="input">
            <input type="number" required>
            <label>Senha do Cartão</label>
        </div>
    </div>
</template>

<style scoped>
.informacoes {
    display: flex;
    flex-direction: column;
    margin-top: 3%;
    gap:35px;
    border: 1px solid;
    padding: 2%;
    width: 50%;
}

input {
    border-radius: 15px;
    border: 1px solid rgb(201, 201, 201);
    padding: 8px;
    height: 30px;
}

.input {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 30px;
}

h2 {
    margin-bottom: 3%;
}

input[type=date]:required:invalid {
    color: transparent;
}

input[type=date]:focus {
    color: grey !important;
}

input::-webkit-inner-spin-button{
    -webkit-appearance: none;
    margin: 0;
}

label {
    position: absolute;
        left: 15px;
        padding: 2%;
        pointer-events: none;
        transition: all 0.5s ease;
        color: rgb(82, 82, 82);
}


.input input:focus+label, .input input:valid+label {
    transform: translateY(-25px) translateX(-20px);
    color: black;
}
</style>