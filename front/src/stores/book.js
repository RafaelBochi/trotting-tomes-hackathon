import { defineStore } from 'pinia';
import bookService from "@/api/book";

export const useBookStore = defineStore('book', {
    state: () => ({
        books: [],
    }),
    actions: {
        async getBooks() {
            try {
                const data = await bookService.getBooks();
                this.books = data;
                console.log(data)
            } catch (e) {
                console.log(e);
            }
        }
    }
});