<template>
  <div>
    <!-- Conteúdo do componente -->
    <ul>
      <li v-for="item in displayedItems" :key="item.id">{{ item }}</li>
    </ul>

    <!-- Componente de paginação -->
    <Pagination :current-page="currentPage" :total-pages="totalPages" @page-change="changePage" />
  </div>
</template>

<script setup>
import Pagination from '@/components/pagination.vue';
import { ref, computed } from 'vue';

const currentPage = ref(1);
const itemsPerPage = 10; // Quantidade de itens exibidos por página
const items = ['1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3',]; // Seus itens de dados

const displayedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return items.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  return Math.ceil(items.length / itemsPerPage);
});

const changePage = (page) => {
  currentPage.value = page;
};

// Carregue seus dados aqui
// Exemplo: items = [...];
</script>
