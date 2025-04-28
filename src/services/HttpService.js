import { useAuthStore } from "@/stores/auth";
import axios from "axios";

const api = axios.create({
    baseURL: 'http://35.196.79.227:8000/',
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

export async function getProductById(productId) {
    try {
        const response = await api.get(`/products/${productId}`);  
        return response.data;
    } catch (error) {
        console.error('Http error in get Product by Id: ',error);
        throw error; 
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
        console.error('Http error in create Product: ',error);
        throw error;
    }
    
}

export async function getCategoties() {
    try {
        const response = await api.get('/categories');
        return response.data;
    } catch (error) {
        console.error('Htto erro in get Categories: ', error)
    }
}

export async function createCategory(category){
    const authStore = useAuthStore();
    const token = authStore.token;
    try {
        const response =  await api.post('categories', category,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Http error in create Category: ',error);
        throw error;
    }
}

export async function editCategory(categoryId, categoryData){
    const authStore = useAuthStore();
    const token = authStore.token;
    try {
        const response = await api.put(`categories/${categoryId}`, categoryData,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Http error in edit Category: ',error);
        throw error
    }
}

export async function deleteCategory(categoryId, token) {
    try {
        const response = await api.delete(`categories/${categoryId}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Http error in delete Category: ',error);
        throw error
    }
}


export async function createAddress(address) {
    const authStore = useAuthStore();
    const token = authStore.token;
    try {
        const response = await api.post('addresses', address, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Http error in create Address: ',error);
        throw error
    }
}

export async function getAddress() {
    const authStore = useAuthStore();
    const token = authStore.token;
    try {
        const response = await api.get('/addresses', {
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar os endereços');
    }
}

export async function editAddress(addressId, addressData, token) {
    try {
        const response = await api.put(`addresses/${addressId}`, addressData, {
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;  
    } catch (error) {
        console.error('Http error in edit Address: ',error);
        throw error
    }
}

export async function deleteAddress(addressId){
    try {
        const response = await api.delete(`addresses/${addressId}`, {
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
    } catch (error) {
        console.error('Http error in delete Address: ',error);
        throw error
    }
}

export async function createCart(userId, token) {
    try {
        const response = await api.post('/cart', {user_id: userId}, {
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar carrinho:', error);
        throw error
    }
}

export async function getCart(token) {
    try {
        const response = await api.get('/cart/items', {
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        console.log('Dados Cart');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar o carrinho existente');
    }
}

export async function addItemCart(item, token ) {
    try {
        const response = await api.post(`/cart/items`,item,  {
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao adicionar produto no carrinho existente');
    }
}

export async function updateItemCart(item, token) {
    try {
        const response = await api.put('/cart/items', item, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
      
          return response.data;
    } catch (error) {
        console.error('Erro ao atualizar o produto no carrinho existente');
    }
}

export async function removeItemCart(Product, token) {
    try {
        const response = await api.delete(`/cart/items`,  {
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data: Product
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao deletar produto no carrinho existente');
    }
}

export async function createOrder(Order,token) {
    try {
        const response = await api.post('/orders', Order, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar pedido:', error);
    }
}

export async function getOrders(token) {
    try {
        const response = await api.get('/orders', {
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar os pedidos existentes');
    }
}


export async function createCoupon(Coupon, token) {
    try {
        const response = await api.post('/coupons', Coupon, {
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('http error to create coupom:',error);
    }
}

export async function getCoupons(token) {
    try {
        const response = await api.get('/coupons', {
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar os cupons existentes');
    }
}

export async function editCoupom(coupomId, coupomData, token) {
    try {
        const response = await api.put(`coupons/${coupomId}`, coupomData, {
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Http error in Edit Coupom:', error);
    }
}

export async function deleteCoupom(coupomId, token) {
    try {
        const response = await api.delete(`coupons/${coupomId}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Http error in Delete Coupom:', error);
    }
}

export async function createDiscount(discount, token) {
    try {
        const response = await api.post('/discounts', discount, {
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('HTTP error while creating discount:', error);
    }
}

export async function getDiscounts(token) {
    try {
        const response = await api.get('/discounts', {
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('HTTP error while fetching discounts:', error);
    }
}

export async function editDiscount(discountId, discountData, token) {
    try {
        const response = await api.put(`/discounts/${discountId}`, discountData, {
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('HTTP error while editing discount:', error);
    }
}

export async function deleteDiscount(discountId, token) {
    try {
        const response = await api.delete(`/discounts/${discountId}`, {
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('HTTP error while deleting discount:', error);
    }
}
