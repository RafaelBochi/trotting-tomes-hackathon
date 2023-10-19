import { defineStore } from "pinia";
import cartService from "@/api/cart";
import { useStorage } from "@vueuse/core";
import { useUserStore } from "./user";

export const useCartStore = defineStore("cart", {
    state: () => ({
        booksCart: useStorage("booksCart", []),
        cartId: useStorage("cartId", Number),
        cart: useStorage("cart", []),
    }),
    actions: {
        async getCart() {
            try{
              const data = await cartService.getCart(useUserStore().user.id)
              this.cartId = data[0].id
              this.cart = data[0]
              console.log(this.cart)
            } catch(error) {
              console.log(error)
            }
          },
          async getBooksCart(){
            try {
              const data = await cartService.getBooksCart(this.cartId);
              this.booksCart = data;
            } catch (error) {
              console.log(error); // Lidar com exceções
            }
          },
          async changeQuantity(id, item, book, quantidade, stock){
            console.log('a')
            if(item.quantidade + quantidade > stock) return console.log('b');
            else if (item.quantidade + quantidade <= 0) return;
            try {
              const values = {
                carrinho: this.cartId,
                livro: book,
                quantidade: item.quantidade + quantidade
              };
              const data = await cartService.changeQuantity(values, id);
              this.getBooksCart(this.cartId);
              this.getCart();
            } catch (error) {
              console.log(error); // Lidar com exceções
            }
          },
          async addBookCart(book, quantidade){
            try {
              const values = {
                carrinho: this.cartId,
                livro: book,
                quantidade: quantidade
              }
              if(this.booksCart.length > 0){
                for (let item of this.booksCart) {
                  if(item.livro.id == book){
                    values.quantidade = item.quantidade + quantidade
                    this.deleteBookCart(item.id)
                  }
                }
              }
              const data = await cartService.addBookCart(values);
              this.getBooksCart()
              this.getCart()
            } catch (error) {
              console.log(error); // Lidar com exceções
            }
          },
          async deleteBookCart(id){
            try {
              const data = await cartService.deleteBookCart(id);
              this.getBooksCart()
              this.getCart()
            } catch (error) {
              console.log(error); // Lidar com exceções
            }
          },
    }
});