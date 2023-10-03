<script setup>

</script>

<template>
  <main>
    <h2>Selecione o método de pagamento</h2>
    <div class="metodos">
      <div class="metodo">
        <input type="radio" name="metodo" id="boleto" />
        <label for="boleto">Boleto</label>
      </div>
      <div class="metodo">
        <input type="radio" name="metodo" id="cartao" />
        <label for="cartao">Cartão</label>
      </div>
      <div class="metodo">
        <input type="radio" name="metodo" id="pix" />
        <img src="../../../public/icones/pix.png" alt="">
        <label for="pix">Pix</label>
      </div>
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
  margin-top: 5%;
  user-select: none;
  width: 50%;
}

img {
  width: 5%;
}

label {
  font-size: larger;
  cursor: pointer;
}

input {
  cursor: pointer;
}

.metodo {
  border: 1px solid black;
  margin-top: 5%;
  padding: 2%;
  width: 100%;
  display: flex;
  align-content: center;
  gap: 5%;
  align-items: center;
}
</style>
