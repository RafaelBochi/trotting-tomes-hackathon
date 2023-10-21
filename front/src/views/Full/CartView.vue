<script setup>
import { ref, computed, onMounted } from "vue";
import { useCartStore } from "@/stores/cart.js";
import { useBookStore } from "@/stores/book.js";
import Book from "../../components/Full/Cart/Book.vue";
import RecommendedBook from "../../components/Full/Cart/RecommendedBook.vue";

const cartStore = useCartStore();
const bookStore = useBookStore();

const booksCart = computed(() => cartStore.booksCart);
const recommendedBooks = ref(bookStore.books.sort(() => Math.random() - 0.5).slice(0, 5));

function changeRecommendedBook(id) {
    const sliceBook = recommendedBooks.value.findIndex(item => item.id == id);
    const newBook = bookStore.books.sort(() => Math.random() - 0.5).slice(0, 1);
    // let newBook;
    // do {
    //     newBook = bookStore.books.sort(() => Math.random() - 0.5).slice(0, 1)[0];
    // } while (recommendedBooks.value.some(item => item.id == newBook.id))
    recommendedBooks.value.splice(sliceBook, 1, newBook[0]);

}
</script>

<template>
    <main>
        <h1>
            Carrinho de Compras
        </h1>

        <h3 v-if="booksCart.length == 0">
            Seu carrinho está vazio...
        </h3>
        <section class="itens" v-else>
            <Book v-for="item in booksCart" :key="item.id" :item="item" />
        </section>

        <section class="details">
            <div class="buy">
                <p>
                    Subtotal ({{ cartStore.booksCart.length }} itens): R$ {{ cartStore.cart.total }}
                </p>
                <router-link to="/comprar">
                    <button>
                        Finalizar Compra
                    </button>
                </router-link>
            </div>

            <div class="recommended">
                <h2>
                    Recomendados para você
                </h2>
                <RecommendedBook v-for="book in recommendedBooks" :key="book.id" :book="book" @changeRecommendedBooks="changeRecommendedBook"/>
            </div>

        </section>
    </main>
</template>

<style scoped>
main {
    width: 100%;
    padding: 2%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
}

h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--primary-color);
    width: 100%;
}

.itens {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15%;
    row-gap: 50px;
    width: 70%;
    height: 100%;
    align-content: baseline;
}

h3 {
    width: 70%;
    font-size: 1.5rem;
}

.details {
    width: 25%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.details .buy {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.details .buy p {
    font-size: 1.5rem;
    font-weight: bold;
    text-wrap: nowrap;
}

.details .buy button {
    width: 100%;
    height: 30px;
    background-color: var(--primary-color);
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    min-width: 180px;
}

.recommended {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.recommended h2 {
    font-size: 1.5rem;
    font-weight: bold;
}



@media screen and (max-width: 869px) {
    .itens {
        justify-content: center;
        width: 100%;
        margin: 0;
    }
}

@media screen and (max-width: 450px) {
    .item {
        width: 400px;
        min-width: 200px;
    }

    .item .title {
        width: 150px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
}
</style>