import axios from "axios";
import { useUserStore } from "@/stores/user";
import { useGlobalStore } from "../stores/global";

class FavoriteService {
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
        return data;
    }
}

export default new FavoriteService();