import axios from "axios";

const api = axios.create({
    baseURL: 'http://34.138.111.33:8000/',
});


export async function Login(payload) {
    try {
        const response = await api.post('login',payload);
        return response;
    } catch (error) {
        console.error('Error ao efetuar o login', error);
        throw error;
    }
}

export async function Register(payload) {
    try {
        const response = await api.post('register',payload);
        return response;
    } catch (error) {
        console.error('Error ao cadastrar o usuário', error);
        throw error;
    }
}