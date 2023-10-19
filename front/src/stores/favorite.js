import { defineStore } from "pinia";
import favoriteService from "@/api/favorite";
import { useStorage } from "@vueuse/core";
import { useUserStore } from "@/stores/user";
import { useBookStore } from "@/stores/book";

export const useFavoriteStore = defineStore("favorite", {
    state: () => ({
        favorites: useStorage("favorites", []),
    }),
    actions: {
        async getFavorites(){
            try {
              const data = await favoriteService.getFavorites(useUserStore().user.id);
              this.favorites = data;
            } catch (error) {
              console.log(error); // Lidar com exceções
            }
          },
          async addFavorite(book){
            try {
              const values = {
                user: useUserStore().user.id,
                book: book.id,
              }
              const data = await favoriteService.addFavorite(values);
              this.getFavorites()
              // useBookStore().getBooks()
            } catch (error) {
              console.log(error); // Lidar com exceções
            }
          },
          async deleteFavorite(id){
            try {
              const data = await favoriteService.deleteFavorite(id);
              this.getFavorites()
            } catch (error) {
              console.log(error); // Lidar com exceções
            }
          },
    }
})