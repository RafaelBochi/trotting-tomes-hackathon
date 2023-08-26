import axios from "axios";
import { useUserStore } from "@/stores/user";

class CartService {
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
    async getBooksCart(id) {
        const userStore = useUserStore();
        const config = {
            headers: { Authorization: `Bearer ${userStore.user.token}`,  
            'Content-Type': 'multipart/form-data',
            accept: 'application/json', },
            
        };
        const { data } = await axios.get(`/api/get_books_cart_of_user/`, { params: { cart_id: id } }, config )
        return data;
    }
    async changeQuantity(values, id) {
        const userStore = useUserStore();
        const config = {
            headers: { Authorization: `Bearer ${userStore.user.token}`,  
            'Content-Type': 'multipart/form-data',
            accept: 'application/json', },
            
        };
        const { data } = await axios.patch(`/carrinhoLivros/${id}/`, values, config )
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
    async deleteBookCart(id) {
        const userStore = useUserStore();
        const config = {
            headers: { Authorization: `Bearer ${userStore.user.token}`,  
            'Content-Type': 'multipart/form-data',
            accept: 'application/json', },
            
        };
        const { data } = await axios.delete(`/api/carrinhoLivros/${id}/`, config )
        return data;
    }
}

export default new CartService();