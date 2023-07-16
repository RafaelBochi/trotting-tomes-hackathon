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
        async getAuthors() {
            try {
                const data = await othersService.getAuthors();
                this.authors = data;
                console.log(data)
            } catch (e) {
                console.log(e);
            }
        },
        
    }
});