import axios from "axios";

class OthersService {
    async getGenres() {
        const { data } = await axios.get("/api/generos/");
        return data;
    }
    async getBooksGenre(genres) {
        const genreStrings = genres.map(String);
        const { data } = await axios.get("/api/get_books_of_genre/", {
            params: {
                genres: genreStrings
            }
        });
        return data;
    }
}

export default new OthersService();