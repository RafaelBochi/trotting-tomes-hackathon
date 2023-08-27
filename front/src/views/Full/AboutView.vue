<script setup>
import Horse3d from "@/components/Full/About/Horse3d.vue";
</script>

<template>
  <main>
    <div class="Informacoes">
      <div class="Imagem">
        <Horse3d/>
      </div>
      <div class="Conteudo">
        <h1>Sobre a <span>Trotting Tomes</span></h1>
        <p class="paragrafo">Na <span>Trotting Tomes</span>, não apenas vendemos livros - compartilhamos histórias,
          exploramos universos e alimentamos mentes curiosas. Somos mais do que uma loja virtual de livros; somos um
          refúgio para os amantes da literatura.</p> <br>
        <p class="paragrafo">Nossa paixão pela leitura nos impulsiona a selecionar cuidadosamente cada título, oferecendo
          uma variedade que abrange desde clássicos atemporais até descobertas contemporâneas. Acreditamos que os livros
          têm o poder de enriquecer vidas, desencadear imaginações e provocar reflexões profundas.</p><br>
        <p class="paragrafo">Comprometemo-nos a criar uma experiência de compra única, onde você pode explorar gêneros
          diversos, encontrar recomendações personalizadas e mergulhar em páginas que o transportarão para mundos
          desconhecidos. Nossa missão é conectar leitores com livros que toquem seus corações e desafiem suas
          perspectivas.</p><br>
        <p class="paragrafo">Junte-se a nós nesta jornada literária. Descubra novos horizontes, abra portas para o
          conhecimento e embarque em aventuras inesquecíveis, tudo isso com a Trotting Tomes como sua guia confiável.</p>
        <br>
        <p class="paragrafo">Seja bem-vindo(a) à nossa comunidade apaixonada por livros. Seja bem-vindo(a) à
          <span>Trotting Tomes</span>!</p>


      </div>
    </div>
    <div class="Contato">
      <h3> REDES SOCIAIS E FORMAS DE CONTATO</h3>
      <div class="contatos">
      <div class="ContatoItem1">
        <font-awesome-icon :icon="['fas', 'envelope']" class="icone" bounce style="color: var(--primary-color);"
          size="2xl" />
        <p class="email">
          trottingtomes@gmail.com
        </p>
      </div>

      <div class="ContatoItem2">
        <font-awesome-icon :icon="['fas', 'phone']" class="icone" shake style="color: var(--primary-color);" size="2xl" />
        <p class="telefone">
          +55 (99) 9999-9999
        </p>
      </div>
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
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.Informacoes {
  display: flex;
  align-items: center;
  margin-top: 3%;
  justify-content: space-around;
  width: 90%;
  flex-wrap: wrap;
}

.Imagem {
  
  display: block;
  transform: scaleX(-1);
  margin: auto;

}

.Conteudo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  width: 100%;
  max-width: 800px;
  font-size: 1.4rem;
}

h1 {
  font-size: 40px;
  margin-bottom: 30px;
}

.paragrafo {
  font-size: 17px;
  text-align: justify;
}

span {
  color: var(--primary-color);
  text-decoration: underline;
}

.Contato {
  display: flex;
  flex-wrap: wrap;
  font-size: 22px;
  margin-top: 4%;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0px 1px 20px -9px rgba(52, 71, 52, 1);
  padding: 20px;
  width: 80%;
  border-radius: 10px;
  gap: 20px;
  margin: 20px;
}

.Contato h3 {
  text-align: center;
  margin: 0 0 20px 0;
  width: 100%;
}

.ContatoItem1,
.ContatoItem2 {
  display: flex;
  align-items: center;
  font-size: 15px;
  padding: 20px 0;
  gap: 10px;
}

.icones {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  flex-wrap: wrap;
}

.icone {
  font-size: 60px;
  margin-left: 3%;
  margin-right: 3%;
  margin-top: 10px;
}

.telefone {
  margin-left: 2%;
}

.email {
  margin-left: 2%;
}
</style>