import { useAuthStore } from "@/stores/auth";
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

export async function getProducts() {
    try {
        const response = await api.get('/products');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar os produtos');
    }
}

export async function createProduct(product) {
    const authStore = useAuthStore();//pegar os dados do moderador
    const token = authStore.token; //pegar o token guardado na auth Store do Usuário
    try {
        const response = await api.post('products', product,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',

            }
        });
        return response.data;
    } catch (error) {
        console.error('Error ao cadastrar o produto: ',error);
        throw error;
    }
    
}