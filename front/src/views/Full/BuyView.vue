<script setup>

import {ref} from 'vue'
import transferencia from '../../components/Full/Buy/Transferencia.vue'
import cartao from '../../components/Full/Buy/Cartao.vue'
import pix from '../../components/Full/Buy/Pix.vue'

const method = ref('transferencia')

</script>

<template>
  <main>
    <h2>Selecione o método de pagamento</h2>
    <div class="metodos">
      <div :class="method == 'transferencia' ? 'currentMethod' : 'method'" @click="method = 'transferencia'">
        <font-awesome-icon :icon="['fas', 'money-bill-transfer']" class="icon"/>
        <p class="label">Transferência Bancária</p>
      </div>
      <div :class="method == 'cartao' ? 'currentMethod' : 'method'" @click="method = 'cartao'">
        <font-awesome-icon :icon="['fas', 'credit-card']" class="icon"/>
        <p class="label">Cartão</p>
      </div>
      <div :class="method == 'pix' ? 'currentMethod' : 'method'" @click="method = 'pix'">
        <font-awesome-icon :icon="['fab', 'pix']" class="icon"/>
        <p class="label">Pix</p>
      </div>
    </div>
    <transferencia v-if="method == 'transferencia'"/>
    <cartao v-if="method == 'cartao'" />
    <pix v-if="method == 'pix'" />
  </main>
</template>

<style scoped>

main {
  width: 100%;
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

.method, .currentMethod {
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

.method:hover, .currentMethod{
  color: #00386d;
  background-color: #edf1f7;
  transform: scale(1.025);
}
</style>
