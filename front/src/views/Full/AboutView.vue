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
            <h1>AAAAAAAAAAAAAAAAA</h1>
            <p>HACKATON</p>
            <p>2INFO3</p>
        </div>
        <div class="svg-hero" style="height: 150px; overflow: hidden;"><svg viewBox="0 0 500 150" preserveAspectRatio="none"
                style="height: 100%; width: 100%;">
                <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                    style="stroke: none; fill: #fff;"></path>
        </svg></div>
    </header>

    <section class="wave-conteudo website container reveal">
        <div class="conteudo-textos-main text-box">
            <h1>AAAAAAAAAAAAAAAAAAA</h1>
        </div>
    </section>

    <section class="info">
       
    </section>

    <section class="info" style="background-color: #fff; height: 500px;">
       
    </section>

    <section class="info-last">
        <div class="svg-wave" style="height: 150px; overflow: hidden;"><svg viewBox="0 0 500 150" preserveAspectRatio="none"
            style="height: 100%; width: 100%;">
            <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                style="stroke: none; fill: #9ef557;"></path>
        </svg></div>
    </section>

    <footer id="contato">
        <div class="container">
            
        </div>
    </footer>
    </body>

    
</template>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Asap&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Asap", sans-serif;
}
.reveal{
  position: relative;
  transform: translateY(150px);
  opacity: 0;
  transition: 1s all ease;
}

.reveal.active{
  transform: translateY(0);
  opacity: 1;
}

html{
    scroll-behavior: smooth;
}
.hero{
    background-image: linear-gradient(10deg, rgba(81, 138, 29, 0.699) 20%, rgba(228, 224, 225, 0.692) 100%), url(../../../public/banner1.png);
    width: 100%;
    height: 650px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    position: relative;
    overflow: hidden;
}

.textos-hero{
    height: 500px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.textos-hero h1{
    font-size: 60px;
}

.textos-hero p{text-align: center;
    font-size: 25px;
    margin-bottom: 20px;
}

.textos-hero a{
    display: inline-block;
    text-decoration: none;
    padding: 12px 15px;
    background: #a18cd1;
    border-radius: 8px;
    color: #fff;
}

.textos-hero a:hover{
    background: #645583;
}

.svg-hero{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
}

/* Estilos gerais */

.container,
.wave-conteudo{
    width: 90%;
    max-width: 1000px;
    overflow: hidden;
    margin: auto;
    padding: 0 0 80px 0;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.conteudo-textos-main{
    display: flex;
    justify-content: center;
    align-items: center;
    place-content: center;
    text-align: center;
}

span {
    color: #ee9106;
}
.container{
    padding: 90px 0;
}

.cont2{
    position: absolute;
    width: 140px;
    border-radius: 30px;
    margin-left: 40px;
}

.titulo{
    font-weight: 300;
    font-size: 35px;
    text-align: center;
    margin-bottom: 15px;
}

.titulo.left{
    text-align: left;
}

.titulo.right{
    text-align: right;
}

/* Section */

.website{
    display: flex;
    justify-content: center;
}

.website img{
    width: 48%;
}

.website .contenedor-textos-main{
    width: 40%;
}

.paragrafo{
    text-align: justify;
    margin-bottom: 20px;
    font-size: 20px;
}

.cta{
    display: inline-block;
    text-decoration: none;
    background-image: linear-gradient(45deg, #ee3478 0%, #dc662b 99%, #e6dcd9 100%);
    padding: 12px 15px;
    border-radius: 8px;
    color: #fff;
    margin: 10px;
}

.cta:hover {
    background: linear-gradient(45deg, #e4719b 0%, #d48862 99%, #e6dcd9 100%);
}

/* Info */

.info{
    height: 200px;
    background-color: #b3ee83;
    color: #fff;
}


/* Cards */

.conteudo-cards{
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    flex-wrap: wrap;
}

.card{
    width: 30%;
    text-align: center;
    height: 300px;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, .5);
    transform: scale(1);
    transition: transform 0.6s;
}

.card:hover{
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, .5);
    transform: scale(1.03);
    cursor: pointer;
}

.card i{
    margin: 30px 0 20px 0;
    color: #cc9199;
    font-size: 50px;
}

.card p{
    font-weight: 300;
    font-size: 25px;
    margin-bottom: 10px;
}

.last-section img{
    width: 48%;
}

.last-section .contenedor-textos-main{
    width: 40%;
}


/* footer */

footer{
    background: #9ef557;
    color: #fff;
}


@media screen and (max-width:800px){
    .textos-hero h1{
        text-align: center;
        font-size: 50px;
    }
    /* estilos gerais */
    .titulo{
        font-size: 35px;
    }

    .titulo.left{
        text-align: center;
    }

    .info p{
        text-align: center;
    }

    /* section */
    .website{
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
    }

    .website img{
        width: 100%;
    }

    .website .contenedor-textos-main{
        width: 100%;
    }

    /* Cards */

    .card{
        width: 90%;
        margin-bottom: 20px;
    }


    /* last */

    .last-section img{
        width: 98%;
    }

    .last-section .conteudo-textos-main{
        width: 98%;
        margin-bottom: 20px;
    }
 }
@media screen and (max-width:400px){
    .titulo,
    .textos-hero h1{
        font-size: 30px;
    }

    .textos-hero p{
        font-size: 20px;
        text-align: center;
    }

    .card{
        height: 380px;
    }

    .website .conteudo-textos-main{
        margin-bottom: 30px;
    }
}
h1 {
    font-size: 50px;
}
</style>
