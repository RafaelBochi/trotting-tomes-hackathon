import axios from "axios";
import { useUserStore } from "../stores/user";

class OthersService {
    async getGenres() {
        const { data } = await axios.get("/api/generos/");
        return data;
    }
    async getAuthors() {
        const { data } = await axios.get("/api/autores/");
        return data;
    }
    async getComents(id) {
        const { data } = await axios.get("/api/get_coments_of_book/", {params: {id: id}});
        return data;
    }
    async addComent(coment) {
        const userStore = useUserStore();

        const config = {
            headers: { Authorization: `Bearer ${userStore.user.token}`,  
            'Content-Type': 'multipart/form-data',
            accept: 'application/json', },
            
        };
        const { data } = await axios.post("/api/coments/", coment, config);
        return data;
    }
}

export default new OthersService();