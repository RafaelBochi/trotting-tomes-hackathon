<script setup>
const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <section>
    <span class="close" @click="$emit('close')">
        <font-awesome-icon
            :icon="['fas', 'arrow-left']"
            size="2xl"
        />
    </span>
    <div>
      <img :src="book.capa" alt="" />

      <div class="info">
        <h2>
          {{ book.title }}
        </h2>

        <p class="price">R$ {{ book.price }}</p>

        <span class="stars">
          <input type="radio" name="stars" id="star-a" value="5" checked />
          <label for="star-a"></label>

          <input
            type="radio"
            checked="true"
            name="stars"
            id="star-b"
            value="4"
            
          />
          <label for="star-b"></label>

          <input type="radio" name="stars" id="star-c" value="3" />
          <label for="star-c"></label>

          <input type="radio" name="stars" id="star-d" value="2" />
          <label for="star-d"></label>

          <input type="radio" name="stars" id="star-e" value="1" />
          <label for="star-e"></label>
        </span>

        <p class="description">
            "O Lado Bom, o Lado Ruim" é um livro de Matthew Quick que conta a história de Pat Peoples, um homem recém-libertado de uma instituição psiquiátrica. Determinado a reconstruir sua vida, Pat enfrenta desafios pessoais e familiares. Ele mantém uma perspectiva otimista da vida, buscando encontrar "o lado bom" em todas as situações. Ao se envolver com Tiffany, uma mulher igualmente problemática, eles desenvolvem uma amizade especial enquanto enfrentam suas dificuldades. O livro aborda temas como doença mental, superação, relacionamentos familiares e amor. "O Lado Bom, o Lado Ruim" oferece uma visão compassiva sobre as lutas internas e externas dos personagens, explorando a condição humana. O livro foi adaptado para o cinema com o filme "O Lado Bom da Vida", dirigido por David O. Russell.
        </p>

        <div class="actions">
          <span>
            <p>1</p>
            <i>
              <font-awesome-icon :icon="['fas', 'caret-up']" size="xl" />
              <font-awesome-icon :icon="['fas', 'caret-down']" size="xl" />
            </i>
          </span>
          <button>Adicionar ao Carrinho</button>
        </div>
      </div>
    </div>

    <div class="datails"></div>

    <div class="coments"></div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100vw;
  height: 100vh ;
  position: fixed;
  top: 8%;
  left: 0;
  background: #fff;
  z-index: 8;
  align-items: center;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.close {
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
}

section > div {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 2%;
}

section > div img {
    width: 25%;
}

.info {
    width: 40%;
    display: flex;
    flex-direction: column;
}

.info h2 {
    font-size: 3rem;
    font-weight: 400;
}

.info .price {
    font-size: 2rem;
    font-weight: 400;
}

.info .description {
    font-size: 1.4rem;
    font-weight: 400;
    text-align: justify;
    margin: 4% 0;
}

.info .actions {
    display: flex;
    align-items: center;
    gap: 20px;
}

.info .actions span {
    display: flex;
    align-items: center;
}

.info .actions span p {
    font-size: 2rem;
    font-weight: 400;
    margin: 0 10px;
}

.info .actions span i {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 10px;
}

.info .actions span i > * {
    cursor: pointer;
}

.info .actions button {
    width: 200px;
    height: 40px;
    background: var(--primary-color);
    color: #fff;
    border: none;
    border-radius: 3px;
    font-size: 1.5rem;
    font-weight: 400;
    cursor: pointer;
}

.stars {
  display: flex;
  align-items: start;
  position: relative;
}
.stars input {
  display: none;
}

.stars > label {
  width: 20px;
  height: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 20px;
  color: orange;
}

.stars > label::before {
  content: "\2605";
  position: relative;
  top: -8px;
  line-height: 26px;
}

</style>
