import axios from "axios";

class OthersService {
    async getGenres() {
        const { data } = await axios.get("/api/generos/");
        return data;
    }
    async getAuthors() {
        const { data } = await axios.get("/api/autores/");
        return data;
    }
}

export default new OthersService();