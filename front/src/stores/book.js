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
        for (let livros of data) {
          livros.capa = "http://127.0.0.1:8000/" + livros.capa;
        }
        this.books = data;
      } catch (e) {
        console.log(e);
      }
    },
    async getSearchBooks(search) {
      try {
        const data = await bookService.getSearchBooks(search);
        for (let livros of data) {
          livros.capa = "http://127.0.0.1:8000/" + livros.capa;
        }
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
  },
});
