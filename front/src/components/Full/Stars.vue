<script setup>

</script>

<template>
    <div class="stars-coment">
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
            <p>(5.0)</p>
    </div>
</template>

<style scoped>
.stars {
  display: flex;
  align-items: center;
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