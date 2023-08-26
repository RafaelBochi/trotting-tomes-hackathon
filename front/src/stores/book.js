import { defineStore } from "pinia";
import bookService from "@/api/book";

export const useBookStore = defineStore("book", {
  state: () => ({
    books: [],
    searchBooks: [],
  }),
  actions: {
    async getBooks() {
      try {
        const data = await bookService.getBooks();
        this.books = data;
      } catch (e) {
        console.log(e);
      }
    },
    async getBooksFilter(filters) {
      try {
        console.log(filters);

        const data = await bookService.getBooksFilter(filters);
        this.books = data;
      } catch (e) {
        console.log(e);
      }
    },
    async getSearchBooks(search) {
      try {
        const data = await bookService.getSearchBooks(search);
        this.searchBooks = data;
      } catch (e) {
        console.log(e);
      }
    },
    async getBookId(id) {
      try {
        const data = await bookService.getBookId(id);
        console.log(data)
        return data;
      } catch (e) {
        console.log(e);
      }
    },
    async getBestSellers() {
      let bestSellers = this.books

      function compararPorVendas(book1, book2) {
        return book2.vendas - book1.vendas;
      }
    
      bestSellers.sort(compararPorVendas);
      bestSellers = bestSellers.slice(0, 10);
      return bestSellers;
      console.log(books);
    }
  },
});
