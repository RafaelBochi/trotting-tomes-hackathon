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
    async uploadImage(image) {
        const userStore = useUserStore();
        const config = {
            headers: { Authorization: `Bearer ${userStore.user.token}`,  
            'Content-Type': 'multipart/form-data',
            accept: 'application/json', },
            
        };
        console.log(image)
        const { data } = await axios.post("/api/profileImages/", {
            url: image,
            user: userStore.user.id,
            name: userStore.user.name + userStore.user.id,
        }, config ).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
        return data;
    }
    async editAccount(userId, values, image) {
        const userStore = useUserStore();
        const config = {
            headers: { Authorization: `Bearer ${userStore.user.token}`,  
            'Content-Type': 'multipart/form-data',
            accept: 'application/json', },
            
        };
        if (image) {
            this.uploadImage(image)
        }
    }
}

export default new UserService();