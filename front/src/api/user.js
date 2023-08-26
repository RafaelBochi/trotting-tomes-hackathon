import axios from "axios";
import { useUserStore } from "../stores/user";
class UserService {
    async login(user) {
        const { data } = await axios.post("/api/login/", user )
        return data;
    }

    async register(user) {
        const { data } = await axios.post("/api/register/", user )
        return data;
    }
    async forgetPassword(email) {
        const { data } = await axios.post("/api/forget_password/", email );
        return data;
    }
    async checkToken(id, token) {
        const values = {
            user_id: id,
            token: token
        }
        const { data } = await axios.post('/api/check_token/', values)
        return data;
    }
    async changePassword(values) {
        const { data } = await axios.post("/api/change_password/", values )
        return data;
    }
    async editAccount(values) {
        const userStore = useUserStore();
        const config = {
            headers: { Authorization: `Bearer ${userStore.user.token}`,  
            'Content-Type': 'multipart/form-data',
            accept: 'application/json', },
            
        };
        const { data } = await axios.post(`/api/edit_account/`,values, config )
        return data;
    }
}

export default new UserService();