<script setup>

import {ref} from 'vue'

const method = ref('')

</script>

<template>
  <main>
    <h2>Selecione o método de pagamento</h2>
    <div class="metodos">
      <div class="metodo" @click="method = 'boleto'">
        <font-awesome-icon :icon="['fas', 'barcode']" class="icon"/>
        <p class="label">Boleto</p>
      </div>
      <div class="metodo" @click="method = 'cartao'">
        <font-awesome-icon :icon="['fas', 'credit-card']" class="icon"/>
        <p class="label">Cartão</p>
      </div>
      <div class="metodo" @click="method = 'pix'">
        <font-awesome-icon :icon="['fab', 'pix']" class="icon"/>
        <p class="label">Pix</p>
      </div>
    </div>
    <div class="info" v-if="method == 'boleto'">
      boleto
    </div>
    <div class="info" v-if="method == 'cartao'">
      cartão
    </div>
    <div class="info" v-if="method == 'pix'">
      pix
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 1%;
}

.metodos {
  display: flex;
  margin-top: 5%;
  user-select: none;
  width: 50%;
  gap: 5%;
}

.icon {
  font-size: 4rem;
  cursor: pointer;
}

.label {
  font-size: larger;
  cursor: pointer;
  position: relative;
  bottom: -2%;
}

input {
  cursor: pointer;
  accent-color: var(--primary-color);
}

.metodo {
  border: 1px solid black;
  margin-top: 5%;
  padding: 2%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  gap: 5%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.metodo:hover {
  color: #00386d;
  background-color: #edf1f7;
}
</style>
