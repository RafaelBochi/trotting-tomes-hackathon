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
        <p class="paragrafo">Na <span>Trotting Tomes</span>, não apenas vendemos livros - compartilhamos histórias, exploramos universos e alimentamos mentes curiosas. Somos mais do que uma loja virtual de livros; somos um refúgio para os amantes da literatura.</p> <br>
  <p class="paragrafo">Nossa paixão pela leitura nos impulsiona a selecionar cuidadosamente cada título, oferecendo uma variedade que abrange desde clássicos atemporais até descobertas contemporâneas. Acreditamos que os livros têm o poder de enriquecer vidas, desencadear imaginações e provocar reflexões profundas.</p><br>
  <p class="paragrafo">Comprometemo-nos a criar uma experiência de compra única, onde você pode explorar gêneros diversos, encontrar recomendações personalizadas e mergulhar em páginas que o transportarão para mundos desconhecidos. Nossa missão é conectar leitores com livros que toquem seus corações e desafiem suas perspectivas.</p><br>
  <p class="paragrafo">Junte-se a nós nesta jornada literária. Descubra novos horizontes, abra portas para o conhecimento e embarque em aventuras inesquecíveis, tudo isso com a Trotting Tomes como sua guia confiável.</p><br>
  <p class="paragrafo">Seja bem-vindo(a) à nossa comunidade apaixonada por livros. Seja bem-vindo(a) à <span>Trotting Tomes</span>!</p>
  

      </div>
    </div>
    <div class="Contato">
      <h3> REDES SOCIAIS FORMAS DE CONTATO</h3>
      <div class="ContatoItem1">
        <font-awesome-icon :icon="['fas', 'envelope']" class="icone" bounce style="color: var(--primary-color);" size="2xl"/>
        <p class="email">
          trottingtomes@gmail.com
        </p>
      </div>
     
      <div class="icones">
        <font-awesome-icon :icon="['fab', 'facebook']" class="icone" style="color: var(--primary-color)" size="2xl" />
        <font-awesome-icon :icon="['fab', 'instagram']" class="icone" style="color: var(--primary-color)" size="2xl" />
        <font-awesome-icon :icon="['fab', 'twitter']" class="icone" style="color: var(--primary-color)" size="2xl" />
        <font-awesome-icon :icon="['fab', 'youtube']" class="icone" style="color: var(--primary-color)" size="2xl" />
      </div>

      <div class="ContatoItem2">
        <font-awesome-icon :icon="['fas', 'phone']" class="icone"  shake style="color: var(--primary-color);" size="2xl"/>
        <p class="telefone">
          +55 (99) 9999-9999
        </p>

       
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
.Informacoes {
  display: flex;
  align-items: center;
  margin-top: 3%;
  padding-left: 10%;
}

.Imagem img {
  max-width: 100%;
  height: auto;
  display: block;
  transform: scaleX(-1);
  margin: auto;

}

.Conteudo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  width: 60%;
}

h1 {
  font-size: 40px;
}

.paragrafo{
  font-size: 15px;
}

span {
  color: #37A16C;
}

.Contato {
  font-size: 22px;
  margin-top: 4%;
  align-items: center;
}

.Contato h3{
  text-align: center;
}

.ContatoItem1,
.ContatoItem2 {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 20px;
  margin-left: 4%;
  margin-right: 4%;

}

.ContatoItem1{
  border-top: 2px solid black; 
}

.ContatoItem2{
  border-bottom: 2px solid black; 
}
.ContatoItem1 font-awesome-icon,
.ContatoItem2 font-awesome-icon {
  margin-right: 10px;
}

.ContatoItem1 p,
.ContatoItem2 p {
  margin-left: 2%;
}

.icones {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 4%;
}

.icone {
  font-size: 60px;
  margin-left: 3%;
  margin-right: 3%; 
  margin-top: 10px;
}
.telefone{
  margin-left: 2%;
}

.email{
  margin-left: 2%;
}


@media screen and (min-width: 768px) {
  main {
    grid-template-columns: 1fr 2fr;
  }

  .Informacoes {
    grid-template-columns: 1fr;
  }

  .Imagem img {
    margin: 0;
  }

  .Contato {
    font-size: 18px;
    grid-template-columns: 1fr 1fr;
  }
}

</style>