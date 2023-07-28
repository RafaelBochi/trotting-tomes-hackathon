import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import userService from "@/api/user"
import router from '../router';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    loggedIn: useStorage( "loggedIn", false),
    user: useStorage("user", {}),
    tokenResetPassword: useStorage("tokenResetPassword", null),
    popUpLogin: false,
    favorites: useStorage("favorites", []),
    booksCart: useStorage("booksCart", []),
    cart: useStorage("cart", Number)
  }),
  actions: {
    async login(user) {
      try{
        const data = await userService.login(user);
        this.loggedIn = true
        router.push('/')
        this.user = {
          username: data.username,
          email: data.email,
          id: data.id,
          token: data.access
        }
      } catch(e) {
        console.log(e)
      }
    },
    async register(user) {  
      try {
        const data = await userService.register(user);
        this.loggedIn = true;
        this.user = {
          username: data.username,
          email: data.email,
          id: data.id,
        }
        router.push('/');
      } catch (e) {
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
        console.log('a')
        const data = await userService.forgetPassword(email);
        this.userId = data.id
        this.tokenResetPassword = data.token
      } catch(e) {
        console.log(e)
      }
      
    },
    async changePassword(password){
      try {
        console.log(this.userId)
        let values = {
          new_password: password,
          user_id: this.userId,
        };
        const data = await userService.changePassword(values)
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
        console.log(data)
      } catch (error) {
        console.log(error); // Lidar com exceções
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
    async deleteFavorite(id){
      try {
        const data = await userService.deleteFavorite(id);
        console.log(data)
        this.getFavorites()
      } catch (error) {
        console.log(error); // Lidar com exceções
      }
    },
    async getCart() {
      try{

      } catch {

      }
    },
    async addBookCart(book, quantidade){
      try {
        const values = {
          user: this.user.id,
          book: book,
          quantidade: quantidade
        }
        const data = await userService.addBookCart(values);
        console.log(data)
      } catch (error) {
        console.log(error); // Lidar com exceções
      }
    },
    async getBookCart(){
      try {
        const data = await userService.getBookCart(this.user.id);
        for (let item of data) {
          item.book.capa = "http://127.0.0.1:8000/" + item.book.capa;
        }
        this.booksCart = data;
      } catch (error) {
        console.log(error); // Lidar com exceções
      }
    },
    async deleteBookCart(id){
      try {
        const data = await userService.deleteBookCart(id);
        console.log(data)
        this.getBookCart()
      } catch (error) {
        console.log(error); // Lidar com exceções
      }
    }
  }
})
