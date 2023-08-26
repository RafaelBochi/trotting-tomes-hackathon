<script setup>
import HeaderResponsive from '@/components/Full/Responsive/HeaderResponsive.vue';

</script>

<template>
<main>
  <div class="Informacoes">
    <div class="Imagem">
      <img src="../Full/" alt="Imagem">
    </div>
    <div class="Conteudo">
      <h1>Sobre a Trotting Tomes</h1>
    </div>
  </div>
  <div class="Contato">
    <h3> REDES SOCIAIS FORMAS DE CONTATO</h3>
    <p> trottingtomes@gmail.com</p>
    <p>  +55 (99) 9999-9999</p>
  </div>
</main>
</template>

<style scoped>
main {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.Imagem img {
  max-width: 100%;
  height: auto;
}

.Contato {
  grid-column: span 3;
  text-align: center;
}

</style>
