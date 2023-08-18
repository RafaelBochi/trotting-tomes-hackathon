import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import userService from "@/api/user"
import router from '../router';
import { useGlobalStore } from './global';

export const useUserStore = defineStore('user', {
  state: () => ({
    loggedIn: useStorage( "loggedIn", false),
    user: useStorage("user", {}),
    userId: useStorage("userId", Number),
    tokenResetPassword: useStorage("tokenResetPassword", null),
    popUpLogin: false,
    favorites: useStorage("favorites", []),
    booksCart: useStorage("booksCart", []),
    cartId: useStorage("cart", Number),
  }),
  actions: {
    async login(user) {
      try{
        useGlobalStore().showPreloader = true;
        const data = await userService.login(user);
        useGlobalStore().showPreloader = false;
        this.loggedIn = true
        this.user = {
          username: data.username,
          email: data.email,
          id: data.id,
          token: data.access
        }
        router.push('/')
        useGlobalStore().showMessageModal(data.message, "success")
      } catch(e) {
        useGlobalStore().showPreloader = false;
        useGlobalStore().showMessageModal(e.response.data.error, "error")
        console.log(e)
      }
    },
    async register(user) {  
      try {
        useGlobalStore().showPreloader = true;
        const data = await userService.register(user);
        const values = {
          value : user.email,
          password: user.password
        }
        this.login(values)
        useGlobalStore().showPreloader = false;
      } catch (e) {
        useGlobalStore().showPreloader = false;
        useGlobalStore().showMessageModal(e.response.data.message, "error")
        console.log(e);
      }
    },
    logout() {
      this.loggedIn = false;
      this.user = {};
      router.push('/login');
    },
    async forgetPassword(email){
      try {
        useGlobalStore().showPreloader = true;
        const data = await userService.forgetPassword(email);
        this.userId = data.id;
        this.tokenResetPassword = data.token;
        await router.push('/token-change-password')
        useGlobalStore().showPreloader = false;
      } catch(e) {
        console.log(e)
        useGlobalStore().showPreloader = false;
        useGlobalStore().showMessageModal(e.response.data.message, "error")
      }
      
    },
    async changePassword(password){
      try {
        useGlobalStore().showPreloader = true;
        let values = {
          new_password: password,
          user_id: this.userId,
        };
        const data = await userService.changePassword(values);
        router.push('/login')
        useGlobalStore().showPreloader = false;
        useGlobalStore().showMessageModal(data.message, 'success')
      } catch (e) {
        useGlobalStore().showPreloader = false;
        useGlobalStore().showMessageModal(e.response.data.message, "error")
        console.log(e); // Lidar com exceções
      }
    },
    async checkToken(token) {
      try {
        useGlobalStore().showPreloader = true;
        const data = await userService.checkToken(this.userId, token)
        useGlobalStore().showPreloader = false;
        return true;
      } catch(e) {
        console.log(e)
        useGlobalStore().showPreloader = false;
        return false;
      }
    },
    async getFavorites(){
      try {
        const data = await userService.getFavorites(this.user.id);
        for (let item of data) {
          item.book.capa = "http://127.0.0.1:8000/" + item.book.capa;
        }
        this.favorites = data;
      } catch (error) {
        console.log(error); // Lidar com exceções
      }
    },
    async addFavorite(book){
      try {
        const values = {
          user: this.user.id,
          book: book.id,
        }
        const data = await userService.addFavorite(values);
        this.getFavorites()
      } catch (error) {
        console.log(error); // Lidar com exceções
      }
    },
    async deleteFavorite(id){
      try {
        const data = await userService.deleteFavorite(id);
        this.getFavorites()
      } catch (error) {
        console.log(error); // Lidar com exceções
      }
    },
    async getCart() {
      try{
        const data = await userService.getCart(this.user.id)
        this.cartId = data[0].id
        
      } catch(error) {
        console.log(error)
      }
    },
    async getBooksCart(){
      try {
        const data = await userService.getBooksCart(this.cartId);
        for (let item of data) {
          item.livro.capa = "http://127.0.0.1:8000/" + item.livro.capa;
        }
        this.booksCart = data;
        
      } catch (error) {
        console.log(error); // Lidar com exceções
      }
    },
    async addBookCart(book, quantidade){
      try {
        console.log('add in')
        const values = {
          carrinho: this.cartId,
          livro: book,
          quantidade: quantidade
        }
        const data = await userService.addBookCart(values);
        this.getBooksCart()
      } catch (error) {
        console.log(error); // Lidar com exceções
      }
    },
    async deleteBookCart(id){
      try {
        const data = await userService.deleteBookCart(id);
        this.getBookCart()
      } catch (error) {
        console.log(error); // Lidar com exceções
      }
    },
    async editAccount(user){
      try {
        user.user_id = this.user.id
        console.log(user)
        const data = await userService.editAccount(user);
        
      } catch (error) {
        console.log(error); // Lidar com exceções
      }

    }
  }
})
