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
    forgetPassword(email){
      try {
        const data = userService.forgetPassword(email);
        console.log(data)
        this.userId = data.id
        this.tokenResetPassword = data.token
      } catch(e) {
        console.log(e)
      }
      
    },
    changePassword(password){
      try {
        let values = {
          new_password: password,
          user_id: this.userId,
        };
    
        axios.post('http://127.0.0.1:8000/api/change_password/', values)
          .then(response => {
            console.log(response.data); // Exibir a resposta do servidor
          })
          .catch(error => {
            console.log(error); // Lidar com erros de solicitação
          });
      } catch (error) {
        console.log(error); // Lidar com exceções
      }
    }
  }
})
