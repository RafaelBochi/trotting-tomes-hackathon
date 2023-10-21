import { defineStore } from "pinia";
import bookService from "@/api/book";
import { useStorage } from '@vueuse/core'

export const useBookStore = defineStore("book", {
  state: () => ({
    books: [],
    searchBooks: useStorage('searchBooks', []),
  }),
  actions: {
    async getBooks() {
      try {
        const data = await bookService.getBooks();
        this.books = data;
        console.log(this.books)
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
        if(e.response.status === 404) {
          this.books = [];
        }
      }
    },
    async getSearchBooks(search) {
      try {
        console.log(search)
        this.searchBooks = [];
        const data = await bookService.getSearchBooks(search);
        this.searchBooks = data;
        console.log(data)
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
    async getBooksToSlides(type) {
      console.log(type)
      try {
        const data = await bookService.getBooksToSlides(type);
        return data;
      } catch(e) {
        console.log(e);
      }
    }
  },
});
