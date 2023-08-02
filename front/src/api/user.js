import axios from "axios";
import { useUserStore } from "../stores/user";
class UserService {
    async login(user) {
        const { data } = await axios.post("/api/login/", user )
        console.log(data)
        return data;
    }

    async register(user) {
        const { data } = await axios.post("/api/register/", user )
        console.log(data)
        return data;
    }
    async forgetPassword(email) {
        const { data } = await axios.post("/api/forget_password/", email );
        console.log(data)
        return data;
    }
    async changePassword(values) {
        const { data } = await axios.post("/api/change_password/", values )
        console.log(data)
        return data;
    }
    async addFavorite(values) {
        const userStore = useUserStore();
        
        const config = {
            headers: { Authorization: `Bearer ${userStore.user.token}`,  
            'Content-Type': 'multipart/form-data',
            accept: 'application/json', },
            
        };
        const { data } = await axios.post("/favorites/", values, config )
        return data;
    }
    async getFavorites(id) {
        const userStore = useUserStore();
        const config = {
            headers: { Authorization: `Bearer ${userStore.user.token}`,  
            'Content-Type': 'multipart/form-data',
            accept: 'application/json', },
            
        };
        const { data } = await axios.get(`/api/get_favorites_of_user/`, { params: { user_id: id } }, config )
        console.log(data)
        return data;
    }
    async deleteFavorite(id) {
        const userStore = useUserStore();
        const config = {
            headers: { Authorization: `Bearer ${userStore.user.token}`,  
            'Content-Type': 'multipart/form-data',
            accept: 'application/json', },
            
        };
        const { data } = await axios.delete(`/api/favorites/${id}/`, config )
        console.log(data)
        return data;
    }
    async getCart(user) {
        const userStore = useUserStore();
        const config = {
            headers: { Authorization: `Bearer ${userStore.user.token}`,  
            'Content-Type': 'multipart/form-data',
            accept: 'application/json', },
            
        };
        const { data } = await axios.get(`/api/get_cart_user/`, { params: {user: user} }, config)
        return data;
    }
    async addBookCart(values) {
        const userStore = useUserStore();
        
        const config = {
            headers: { Authorization: `Bearer ${userStore.user.token}`,  
            'Content-Type': 'multipart/form-data',
            accept: 'application/json', },
            
        };
        const { data } = await axios.post("/carrinhoLivros/", values, config )
        return data;
    }
    async getBooksCart(id) {
        const userStore = useUserStore();
        const config = {
            headers: { Authorization: `Bearer ${userStore.user.token}`,  
            'Content-Type': 'multipart/form-data',
            accept: 'application/json', },
            
        };
        const { data } = await axios.get(`/api/get_books_cart_of_user/`, { params: { cart_id: id } }, config )
        console.log(data)
        return data;
    }
    async deleteBookCart(id) {
        const userStore = useUserStore();
        const config = {
            headers: { Authorization: `Bearer ${userStore.user.token}`,  
            'Content-Type': 'multipart/form-data',
            accept: 'application/json', },
            
        };
        const { data } = await axios.delete(`/api/carrinhoLivros/${id}/`, config )
        console.log(data)
        return data;
    }
    async editAccount(user) {
        const userStore = useUserStore();
        const config = {
            headers: { Authorization: `Bearer ${userStore.user.token}`,  
            'Content-Type': 'multipart/form-data',
            accept: 'application/json', },
            
        };
        const { data } = await axios.put(`/api/edit_account/`, user, config )
        console.log(data)
        return data;
    }
}

export default new UserService();