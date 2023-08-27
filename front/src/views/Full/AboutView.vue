<script setup>
</script>

<template>
  <main>
    <div class="Informacoes">
      <div class="Imagem">
        <img src="/horseandbook.png" alt="Imagem">
      </div>
      <div class="Conteudo">
        <h1>Sobre a <span>Trotting Tomes</span></h1>
        <p>Na <span>Trotting Tomes</span>, não apenas vendemos livros - compartilhamos histórias, exploramos universos e alimentamos mentes curiosas. Somos mais do que uma loja virtual de livros; somos um refúgio para os amantes da literatura.</p> 
  <p>Nossa paixão pela leitura nos impulsiona a selecionar cuidadosamente cada título, oferecendo uma variedade que abrange desde clássicos atemporais até descobertas contemporâneas. Acreditamos que os livros têm o poder de enriquecer vidas, desencadear imaginações e provocar reflexões profundas.</p>
  <p>Comprometemo-nos a criar uma experiência de compra única, onde você pode explorar gêneros diversos, encontrar recomendações personalizadas e mergulhar em páginas que o transportarão para mundos desconhecidos. Nossa missão é conectar leitores com livros que toquem seus corações e desafiem suas perspectivas.</p>
  <p>Junte-se a nós nesta jornada literária. Descubra novos horizontes, abra portas para o conhecimento e embarque em aventuras inesquecíveis, tudo isso com a Trotting Tomes como sua guia confiável.</p>
  <p>Seja bem-vindo(a) à nossa comunidade apaixonada por livros. Seja bem-vindo(a) à <span>Trotting Tomes</span>!</p>
  

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
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  align-items: center;
}

.Informacoes img {
  height: auto;
  display: block;
  margin: auto; 
  transform: scaleX(-1);
}

.Contato {
  grid-column: span 2;
  text-align: center;
}

.Informacoes {
  display: flex;
  align-items: center;
}

.Conteudo {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center; 
  width: 40%;
}
span{
  color: #37A16C;
}
</style>
