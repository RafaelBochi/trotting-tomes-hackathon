import { defineStore } from "pinia";
import othersService from "@/api/others";
import { useBookStore } from "./book";

export const useOthersStore = defineStore("others", {
    state: () => ({
        authors: [],
        genres: [],
        bookStore: useBookStore(),
    }),
    actions: {
        async getGenres() {
            try {
                const data = await othersService.getGenres();
                this.genres = data;
                console.log(data)
            } catch (e) {
                console.log(e);
            }
        },
        async getBooksGenre(genres) {
            try {
                const data = await othersService.getBooksGenre(genres);
                for (let livros of data) {
                    livros.capa = "http://127.0.0.1:8000/" + livros.capa;
                }
                this.bookStore.books = data;
            } catch (e) {
                console.log(e);
            }
        }
    }
});