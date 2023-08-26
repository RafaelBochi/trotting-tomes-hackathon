<script setup>
import HeaderResponsive from '@/components/Full/Responsive/HeaderResponsive.vue';
</script>

<template>
  <main>
    <div class="Informacao">
      <img src="caminho_para_sua_imagem.jpg" alt="Imagem">
    </div>
    <div class="Conteudo">
      <div class="Titulo">
        <h1>Sobre a Trotting Tomes</h1>
      </div>
      <div class="Paragrafos">
        <p>...</p>
        <p>...</p>
        <p>...</p>
      </div>
    </div>
    <div class="Contato">
      <h3>REDES SOCIAIS FORMAS DE CONTATO</h3>
      <p>trottingtomes@gmail.com</p>
      <p>+55 (99) 9999-9999</p>
    </div>
  </main>
</template>

<style scoped>
main {
  display: grid;
  grid-template-columns: auto 1fr auto; /* Divide o layout em três colunas */
  gap: 20px;
  align-items: center; /* Centraliza verticalmente */
}

.Informacao img {
  width: 100px;
  height: 100px;
  background-color: #f2f2f2;
}

.Conteudo {
  grid-column: 2 / span 1;
}

.Titulo {
  margin-bottom: 10px;
}

.Contato {
  grid-column: 3 / span 1;
  text-align: right;
}

/* Estilize conforme necessário */

</style>