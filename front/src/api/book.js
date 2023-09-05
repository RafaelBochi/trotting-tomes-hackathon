import axios from "axios";

class BookService {
    async getBooks() {
        const { data } = await axios.get("/api/livros/");
        return data;
    }
    async getBooksFilter(filters) {
        const { data } = await axios.get("/api/get_books_of_filters/", { params: filters });
        console.log(data);
        return data;
    }
    async getSearchBooks(search) {
        const { data } = await axios.get("/api/search_books/", { params: search });
        return data;
    }
    async getBookId(id) {
        const { data } = await axios.get(`/api/livros/${id}/`);
        return data;
    }
    async getBooksToSlides(type) {
        const { data } = await axios.get("/api/get_books_to_slides/", { params: {type: type} });
        console.log(type)
        return data;
    }
}

export default new BookService();