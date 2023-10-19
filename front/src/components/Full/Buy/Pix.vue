<script setup>
import axios from 'axios'
import { ref } from 'vue'

// import pixService from '@/api/pix.js'

// const Pix = new pixService()

// async function getPaymentMethods() {
//     let data = await Pix.get()
//     console.log(data)
// }

// getPaymentMethods()


async function pixteste() {
   const teste = await axios.get('https://api.mercadopago.com/v1/payment_methods', {
        headers: {
            Authorization: `Bearer APP_USR-6870288723824475-051212-d8448679fc02d23e5a60485c7fdc3236-1369685958`,
           }
    })
    

return teste.data
}

pixteste()
</script>

<template>
    <div class="informacoes">
        <h2>Adicione os detalhes do pagamento</h2>
        <div class="input">
            <input type="text" required>
            <label>Nome do Beneficiário</label>
        </div>
        <div class="input">
            <input type="text" required>
            <label>Número da Conta</label>
        </div>
        <div class="input">
            <input type="text" required>
            <label>Nome do Banco</label>
        </div>
        <div class="input">
            <input type="number" required>
            <label>Código SWIFT/BIC</label>
        </div>
        <div class="input">
            <input type="text" required>
            <label>IBAN</label>
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