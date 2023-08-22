<script setup>
import SearchResponsive from '@/components/Responsive/SearchResponsive.vue';
</script>

<template>
    <header>
        <div class="logo">
      <router-link to="/home">
        <a href="">
          <p>
            <img src="/logo-mini.png" alt="" />
          </p>
        </a>
      </router-link>
    </div>

    <SearchResponsive class="searchResponsive"/>

    <div class="actions">
        <div class="carrinho" @click="$emit('toggleCart')">
        <font-awesome-icon
          :icon="['fas', 'shopping-cart']"
          size="2xl"
          style="color: var(--primary-color)"
        />
        </div>   
        <div class="menu">
            <font-awesome-icon :icon="['fas', 'bars']" size="2xl" style="color: var(--primary-color)"/>
        </div> 
    </div>
    </header>
</template>

<style scoped>
header {
  position: relative;
  top: 12%;
  background-color: var(--lime-green);
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 1px 20px -9px rgba(52, 71, 52, 1);
  position: sticky;
  top: 0;
  z-index: 11;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.logo {
  position: absolute;
  width: 12%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 2%;
}

.logo img {
  width: 100%;
}

.actions {
    position: relative;
    right: 5%;
    display: flex;
    align-items: center;
    gap: 20px;
}

.searchResponsive {
    width: 150px;
    position: relative;
    right: 5%;
}

.searchResponsive .search input {
  width: 20px;
  height: 10px;
}
</style>
