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
    userId: useStorage("userId", null),
    tokenResetPassword: useStorage("tokenResetPassword", null),
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
        }
        console.log(data)
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
        console.log(data);
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
        console.log(data)
        this.userId = data.id
        this.tokenResetPassword = data.token
        console.log(this.userId)
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
        console.log(values)
        const data = await userService.changePassword(values)
      } catch (error) {
        console.log(error); // Lidar com exceções
      }
    }
  }
})
