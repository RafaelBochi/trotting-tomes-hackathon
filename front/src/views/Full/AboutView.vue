<script setup>
function reveal() {
  let reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let elementTop = reveals[i].getBoundingClientRect().top;
    let elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);
</script>

<template>
  <body>
    <header class="hero">
      <div class="textos-hero">
        <h1>Sobre</h1>
        <p>HACKATON</p>
        <p>2INFO3</p>
        <a class="btn" href="#sobre">Sobre</a>
      </div>
      <div class="svg-hero" style="height: 150px; overflow: hidden">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          style="height: 100%; width: 100%"
        >
          <path
            d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            style="stroke: none; fill: #FFFFFF"
          ></path>
        </svg>
      </div>
    </header>

    <section class="wave-conteudo website container reveal"></section>

    <section class="info">
      <div class="container1">
        <div class="content">
          <h1>Nossa equipe</h1>
          <h2>Nossa equipe é composta por 7 integrantes entre eles são</h2>
          <h2>
            Gabriel Machado, Gabriel HTML <br />
            Gustavo, José <br />
            Vinicius de Paula e Vinicius Nilo
          </h2>
        </div>
        <div class="flap"></div>
      </div>
    </section>
    <div class="wrapper">
      <div class="background-container">
        <div class="bg-1"></div>
        <div class="bg-2"></div>
      </div>
      <div id="sobre" class="about-container reveal">
        <div class="image-container">
          <img src="../../../public/curiosity-amico.png" alt="" />
        </div>

        <div class="text-container">
          <h1>Nosso Desafio</h1>
          <p>
            Nós da Trotting Tomes queriamos que todos pudessem encontrar os mais
            diversos livros de uma forma facil, então observamos que todo mundo
            hoje em dia tem alguma forma de se conectar a internet, a partir
            desse ponto decidimos fazer a loja virtual Trotting Tomes
          </p>
          <a href="">Read More</a>
        </div>
      </div>
    </div>

    <div class="main">
      <div class="box">
        <h1>Transição de Imagem</h1>
      </div>
    </div>

    <section
      class="info"
      style="background-color: #FFFFFF; height: 400px"
    ></section>

    <div class="tester">
      <img
        class="livro1 reveal"
        src="../../../public/Livro-Logo-SEEL.png"
        alt=""
      />
    </div>

    <section class="info-last">
      <div class="svg-wave" style="height: 150px; overflow: hidden">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          style="height: 100%; width: 100%"
        >
          <path
            d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            style="stroke: none; fill: #A8A8A8"
          ></path>
        </svg>
      </div>
    </section>

    <footer class="footer">
      <div style="background-color: #A8A8A8" class="container">
        <div class="row">
          <div class="footer-col">
            <h4>Compania</h4>
            <ul>
              <li><a href="#">Sobre</a></li>
              <li><a href="#">Nossos serviços</a></li>
              <li><a href="#">Privacidade e Política</a></li>
              <li><a href="#">Afiliados</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Ajuda</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Produtos</a></li>
              <li><a href="#">Retornos</a></li>
              <li><a href="#">Status de Pedidos</a></li>
              <li><a href="#">Opções de Pagamento</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Loja Online</h4>
            <ul>
              <li><a href="#">Romance</a></li>
              <li><a href="#">Ação</a></li>
              <li><a href="#">Ficção</a></li>
              <li><a href="#">Fantasia</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Siga-nos</h4>
            <div class="social-links">
              <a href="#"><i class="fab fa-facebook-f"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-instagram"></i></a>
              <a href="#"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </body>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Asap&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Asap", sans-serif;
}

@import url("https://fonts.googleapis.com/css2?family=Merriweather:wght@300;900&display=swap");

body {
  background: #FFFFFF;
}

/* Estilos gerais */

.container,
.wave-conteudo {
  background-color: #4BA78A;
  display: flex;
  width: 90%;
  max-width: 1000px;
  overflow: hidden;
  margin: auto;
  padding: 0 0 80px 0;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.conteudo-textos-main {
  display: flex;
  justify-content: center;
  align-items: center;
  place-content: center;
  text-align: center;
}

span {
  color: #ee9106;
}
.container {
  padding: 90px 0;
}

.cont2 {
  position: absolute;
  width: 140px;
  border-radius: 30px;
  margin-left: 40px;
}

.titulo {
  font-weight: 300;
  font-size: 35px;
  text-align: center;
  margin-bottom: 15px;
}

.titulo.left {
  text-align: left;
}

.titulo.right {
  text-align: right;
}
.ex {
  position: absolute;
  transition: 1s;
}

.ex:hover {
  transform: translateZ(60%);
}

.child {
  width: 300px;
  display: flex;
  justify-content: left;
}

.container1 {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 400px;
  width: 600px;
  background: #FFFFFF;
  overflow: hidden;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 0 20px 8px #d0d0d0;
}

.content {
  position: absolute;
  top: 50%;
  transform: translatey(-50%);
  text-align: justify;
  color: #000000;
  padding: 40px;
  font-family: "Merriweather", serif;
}

h1 {
  font-weight: 900;
  text-align: center;
}

h3 {
  font-weight: 300;
}

.flap {
  width: 100%;
  height: 100%;
}

.flap::before {
  position: absolute;
  content: "";
  height: 100%;
  width: 50%;
  background: url("https://pbs.twimg.com/profile_images/1347260174176710658/2GfSZ1i__400x400.jpg")
  #FFFFFF;
  background-position: 100px;
  background-repeat: no-repeat;
  transition: 1s;
}

.flap::after {
  position: absolute;
  content: "";
  height: 100%;
  width: 50%;
  right: 0;
  background: url("https://pbs.twimg.com/profile_images/1347260174176710658/2GfSZ1i__400x400.jpg")
  #FFFFFF;
  background-position: -200px;
  background-repeat: no-repeat;
  transition: 1s;
}

.container1:hover .flap::after {
  transform: translatex(300px);
}

.container1:hover .flap::before {
  transform: translatex(-300px);
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background: #FFFFFF;
  backdrop-filter: blur(20px);
  flex-direction: row;
  transition: 1s;
}
.main h1 {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 20px 0px;
  font-size: 50px;
  color: #FFFFFF;
  transition: 1s;
  overflow: 1;
}

.main:hover {
  transform: translateX(20%);
}
.main h1:hover {
  transform: translateX(50%);
}
.box {
  width: 50%;
  min-height: 60vh;
  background-color: #FFFFFF;
  animation: changebg 50s ease-in-out infinite;
  border-radius: 20px;
}
@keyframes changebg {
  0% {
    background: url(https://i.pinimg.com/736x/ea/80/03/ea8003eda835af024292148060887ed4.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  10% {
    background: url(https://i.pinimg.com/736x/ea/80/03/ea8003eda835af024292148060887ed4.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  20% {
    background: url(https://i.pinimg.com/736x/ea/80/03/ea8003eda835af024292148060887ed4.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  30% {
    background: url(https://i.pinimg.com/736x/ea/80/03/ea8003eda835af024292148060887ed4.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  40% {
    background: url(https://cutewallpaper.org/21/4k-night-wallpaper/2222724160.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  50% {
    background: url(https://i.pinimg.com/736x/ea/80/03/ea8003eda835af024292148060887ed4.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  60% {
    background: url(https://cutewallpaper.org/21/4k-night-wallpaper/2222724160.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  70% {
    background: url(https://i.pinimg.com/736x/ea/80/03/ea8003eda835af024292148060887ed4.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  80% {
    background: url(https://cutewallpaper.org/21/4k-night-wallpaper/2222724160.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  90% {
    background: url(https://i.pinimg.com/736x/ea/80/03/ea8003eda835af024292148060887ed4.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  100% {
    background: url(https://cutewallpaper.org/21/4k-night-wallpaper/2222724160.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
@media screen and (max-width: 1368px) {
  .box {
    width: 80%;
    height: 70vh;
  }
}
@media screen and (max-width: 500px) {
  .box {
    width: 80%;
    height: 60vh;
  }
}
.wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.background-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
}
.bg-1 {
  flex: 1;
  background-color: #FFFFFF;
}
.bg-2 {
  flex: 1;
  background-color: #FFFFFF;
}
.about-container {
  width: 70%;
  position: absolute;
  background-color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 40px;
  border-radius: 40px;
}
.image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
}
.image-container img {
  position: relative;
  width: 80%;
  height: 500px;
  margin: 20px;
  border-radius: 10px;
  background-size: contain;
}
.text-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  font-size: 22px;
}
.text-container h1 {
  font-size: 70px;
  padding: 20px 0px;
}
.text-container a {
  text-decoration: none;
  padding: 12px;
  margin: 50px 0px;
  background-color: #A8CE66;
  border: 2px solid transparent;
  color: #FFFFFF;
  border-radius: 5px;
  transition: 0.3s all ease;
}
.text-container a:hover {
  background-color: transparent;
  color: black;
  border: 2px solid #A8CE66;
}
@media screen and (max-width: 1600px) {
  .about-container {
    width: 90%;
  }
  .image-container img {
    width: 400px;
    height: 400px;
  }
  .text-container h1 {
    font-size: 50px;
  }
}
@media screen and (max-width: 1100px) {
  .about-container {
    flex-direction: column;
  }
  .image-container img {
    width: 300px;
    height: 300px;
  }
  .text-container {
    align-items: center;
  }
}
.reveal {
  transform: translateY(150px);
  opacity: 0;
  transition: 1s all ease;
}

.reveal.active {
  transform: translateY(0);
  opacity: 1;
}

html {
  scroll-behavior: smooth;
}
.hero {
  background-image: linear-gradient(
      10deg,
      #5b5b5b 20%,
      #A8A8A8 100%
    ),
    url(../../../public/biblioteca.jpg);
  width: 100%;
  height: 650px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
}

.textos-hero {
  height: 500px;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.textos-hero h1 {
  font-size: 60px;
}

.textos-hero p {
  text-align: center;
  font-size: 25px;
  margin-bottom: 20px;
}

.textos-hero a {
  display: inline-block;
  text-decoration: none;
  padding: 12px 15px;
  background: #a18cd1;
  border-radius: 8px;
  color: #FFFFFF;
}

.textos-hero a:hover {
  background: #645583;
}

.svg-hero {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

/* Section */

.website {
  display: flex;
  justify-content: center;
}

.website img {
  width: 48%;
}

.website .contenedor-textos-main {
  width: 40%;
}

.paragrafo {
  text-align: justify;
  margin-bottom: 20px;
  font-size: 20px;
}

.cta {
  display: inline-block;
  text-decoration: none;
  background-image: linear-gradient(
    45deg,
    #ee3478 0%,
    #dc662b 99%,
    #e6dcd9 100%
  );
  padding: 12px 15px;
  border-radius: 8px;
  color: #FFFFFF;
  margin: 10px;
}

.cta:hover {
  background: linear-gradient(45deg, #e4719b 0%, #d48862 99%, #e6dcd9 100%);
}

/* Info */

.info {
  background-color: #A8CE66;
  color: #FFFFFF;
}

/* Cards */

.conteudo-cards {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.card {
  width: 30%;
  text-align: center;
  height: 300px;
  box-shadow: 0 0 3px 0 #000000;
  transform: scale(1);
  transition: transform 0.6s;
}

.card:hover {
  box-shadow: 0 0 6px 0 #000000;
  transform: scale(1.03);
  cursor: pointer;
}

.card i {
  margin: 30px 0 20px 0;
  color: #cc9199;
  font-size: 50px;
}

.card p {
  font-weight: 300;
  font-size: 25px;
  margin-bottom: 10px;
}

.last-section img {
  width: 48%;
}

.last-section .contenedor-textos-main {
  width: 40%;
}

@media screen and (max-width: 800px) {
  .textos-hero h1 {
    text-align: center;
    font-size: 50px;
  }
  /* estilos gerais */
  .titulo {
    font-size: 35px;
  }

  .titulo.left {
    text-align: center;
  }

  .info p {
    text-align: center;
  }

  /* section */
  .website {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }

  .website img {
    width: 100%;
  }

  .website .contenedor-textos-main {
    width: 100%;
  }

  /* last */

  .last-section img {
    width: 98%;
  }

  .last-section .conteudo-textos-main {
    width: 98%;
    margin-bottom: 20px;
  }
}
@media screen and (max-width: 400px) {
  .titulo,
  .textos-hero h1 {
    font-size: 30px;
  }

  .textos-hero p {
    font-size: 20px;
    text-align: center;
  }

  .card {
    height: 380px;
  }

  .website .conteudo-textos-main {
    margin-bottom: 30px;
  }
}
h1 {
  font-size: 50px;
}
.livro1 {
  display: flex;
  position: absolute;
  width: 400px;
}
.tester {
  display: flex;
  position: relative;
  justify-content: end;
  margin-bottom: 300px;
}

.row {
  display: flex;
  flex-wrap: wrap;
}
ul {
  list-style: none;
}
.footer {
  background-color: #242b26;
  padding: 70px 0;
}
.footer-col {
  width: 25%;
  padding: 0 15px;
}
.footer-col h4 {
  font-size: 18px;
  color: #FFFFFF;
  text-transform: capitalize;
  margin-bottom: 35px;
  font-weight: 500;
  position: relative;
}
.footer-col h4::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: -10px;
  background-color: #e91e63;
  height: 2px;
  box-sizing: border-box;
  width: 50px;
}
.footer-col ul li:not(:last-child) {
  margin-bottom: 10px;
}
.footer-col ul li a {
  font-size: 16px;
  text-transform: capitalize;
  color: #FFFFFF;
  text-decoration: none;
  font-weight: 300;
  color: #bbbbbb;
  display: block;
  transition: all 0.3s ease;
}
.footer-col ul li a:hover {
  color: #FFFFFF;
  padding-left: 8px;
}
.footer-col .social-links a {
  display: inline-block;
  height: 40px;
  width: 40px;
  background-color: #A8A8A8;
  margin: 0 10px 10px 0;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  color: #FFFFFF;
  transition: all 0.5s ease;
}
.footer-col .social-links a:hover {
  color: #242b26;
  background-color: #FFFFFF;
}

/*responsive*/
@media (max-width: 767px) {
  .footer-col {
    width: 50%;
    margin-bottom: 30px;
  }
}
@media (max-width: 574px) {
  .footer-col {
    width: 100%;
  }
}
</style>
