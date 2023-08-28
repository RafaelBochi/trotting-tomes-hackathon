import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import userService from "@/api/user"
import router from '../router';
import { useGlobalStore } from './global';
import { useFavoriteStore } from './favorite';
import { useCartStore } from './cart';

export const useUserStore = defineStore('user', {
  state: () => ({
    loggedIn: useStorage( "loggedIn", false),
    user: useStorage("user", {}),
    userId: useStorage("userId", Number),
    tokenResetPassword: useStorage("tokenResetPassword", null),
    popUpLogin: false,
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
        await useFavoriteStore().getFavorites();
        await useCartStore().getCart()
        await useCartStore().getBooksCart()
        useGlobalStore().showMessageModal(data.message, "success")
      } catch(e) {
        useGlobalStore().showPreloader = false;
        useGlobalStore().showMessageModal(e.response.data.message, "error")
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
        useGlobalStore().showMessageModal(data.message, "success")
      } catch (e) {
        useGlobalStore().showPreloader = false;
        useGlobalStore().showMessageModal(e.response.data.message, "error")
        console.log(e);
      }
    },
    logout() {
      this.loggedIn = false;
      this.user = {};
      useCartStore().cart = [];
      useCartStore().booksCart = [];
      useCartStore().cartId = null;
      useFavoriteStore().favorites = [];
      router.push('/login');  

      window.location.reload()
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
    async editAccount(dados, image){
      try {
        const values = {
          user_id: this.user.id,
          username: dados.username,
          email: dados.email,
          image: image
        }
        const data = await userService.editAccount(values);
        this.user.username = data.username;
        this.user.email = data.email;
        useGlobalStore().showMessageModal(data.message, "success")
      } catch (error) {
        console.log(error); // Lidar com exceções
      }

    }
  }
})
