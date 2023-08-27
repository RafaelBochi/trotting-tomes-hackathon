<script setup>
import { computed, ref } from "vue";

const nota = ref(1);

const titleComent = ref("");

const textComent = ref("");

const coment = computed(() => {
  return {
    title: titleComent.value,
    text: textComent.value,
    stars: nota.value,
  };
});
</script>

<template>
  <section>
    <div class="form">
      <h2>Adicione seu comentário</h2>
      <div class="stars">
        <span class="stars" v-for="i in 5" :key="i">
          <input type="radio" />
          <label :class="nota >= i ? `true` : ``" @click="nota = i"></label>
        </span>
      </div>
      <div class="inputs title">
        <input type="text" class="inputTitle" v-model="titleComent"/>
        <label>Titulo</label>
      </div>

      <div class="inputs coment">
        <textarea maxlength="500" class="inputComent" v-model="textComent"></textarea>
        <label>Comentário</label>
      </div>

      <div class="actions">
        <button @click="$emit('closeForm')">Voltar</button>
        <button @click="$emit('addComent', coment)">Comentar</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  backdrop-filter: blur(10px);
  z-index: 19;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1% 5%;
  background-color: #fff;
  gap: 25px;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  width: 40%;
  height: 55%;
  min-height: 400px;
  min-width: 300px;
}

h2 {
    font-size: 2rem;
    font-weight: bolder;
}

.stars > label {
  width: 30px;
  height: 30px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 30px;
  color: orange;
}

.inputs {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
}

.title {
    height: 50px;
}

.inputTitle {
    outline: 0;
    border-radius: 5px;
    border: black 2px solid;
    padding: 2%;
    width: 100%;
    height: 35px;
    font-size: 1.3rem;
}

.coment {
    height: 120px;
}
.inputComent {
    width: 100%;
    outline: 0;
    border-radius: 5px;
    border: black 2px solid;
    font-size: 1.3rem;
    padding: 2%;
    resize: none;
    height: 105px;

}

.inputs label {
    position: absolute;
    top: 0%;
    left: 2%;
    transition: 0.5s;
    pointer-events: none;
    background-color: #fff;
    padding: 0 1%;
    font-size: 1.2rem;
}

.inputs input:focus + label, .inputs textarea:focus + label {
    top: -10px;
    left: 0%;
    font-size: 1rem;
}

.actions {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.actions button:nth-child(1) {
    width: 100px;
    height: 30px;
    background: transparent;
    color: var(--error-color);
    border: 2px solid var(--error-color);
    border-radius: 3px;
    font-size: 1.4rem;
    font-weight: bold;
    cursor: pointer;
}

.actions button:nth-child(2) {
    width: 150px;
    height: 30px;
    background: var(--lime-green);
    color: #fff;
    border: 2px solid var(--lime-green);
    border-radius: 3px;
    font-size: 1.4rem;
    font-weight: bold;
    cursor: pointer;
}
</style>
