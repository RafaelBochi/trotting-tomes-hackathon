<script setup>
</script>

<template>
  <main>
    <div class="Informacoes">
      <div class="Imagem">
        <img src="/horseandbook.png" alt="Imagem">
      </div>
      <div class="Conteudo">
        <h1>Sobre a Trotting Tomes</h1>
      </div>
    </div>
    <div class="Contato">
      <h3> REDES SOCIAIS FORMAS DE CONTATO</h3>
      <div>
        <font-awesome-icon :icon="['fas', 'envelope']" bounce style="color: var(--primary-color);" size="2xl"/>
        <p>
          trottingtomes@gmail.com
        </p>
      </div>
      <div>
        <font-awesome-icon :icon="['fas', 'phone']" shake style="color: var(--primary-color);" size="2xl"/>
        <p>
          +55 (99) 9999-9999
        </p>
      </div>
      <div class="icones">
        <font-awesome-icon :icon="['fab', 'facebook']" class="icone" style="color: var(--primary-color)" size="2xl" />
        <font-awesome-icon :icon="['fab', 'instagram']" class="icone" style="color: var(--primary-color)" size="2xl" />
        <font-awesome-icon :icon="['fab', 'twitter']" class="icone" style="color: var(--primary-color)" size="2xl" />
        <font-awesome-icon :icon="['fab', 'youtube']" class="icone" style="color: var(--primary-color)" size="2xl" />
      </div>
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
