import { defineStore } from "pinia";
import othersService from "@/api/others";
import { useBookStore } from "./book";

export const useOthersStore = defineStore("others", {
    state: () => ({
        authors: [],
        genres: [],
        bookStore: useBookStore(),
        coments: [],
    }),
    actions: {
        async getGenres() {
            try {
                const data = await othersService.getGenres();
                this.genres = data;
            } catch (e) {
                console.log(e);
            }
        },
        async getAuthors() {
            try {
                const data = await othersService.getAuthors();
                this.authors = data;
            } catch (e) {
                console.log(e);
            }
        },
        async getComents() {
            try {
                const data = await othersService.getComents();
                this.coments = data;
            } catch (e) {
                console.log(e);
            }
        },
        async addComent(coment) {
            try {
                const data = await othersService.addComent(coment);
                this.getComents();
            } catch (e) {
                console.log(e);
            }
        }
    }
});