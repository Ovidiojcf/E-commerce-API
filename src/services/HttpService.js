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
        console.error('Http error in Log User', error);
        throw error;
    }
}

export async function Register(payload) {
    try {
        const response = await api.post('register',payload);
        return response;
    } catch (error) {
        console.error('Http error in Register User', error);
        throw error;
    }
}

export async function getUser(token) {
    try {
        const response = await api.get('users/me', {
            headers: { 
                "Authorization": `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Http error in get user data', error);
        throw error;
    }
}

export async function editUserImage(file, token) {
    try {
        const formData = new FormData();
        formData.append('image', file);
        const response = await api.put('users/image',formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Http error in edit user image: ',error);
        throw error;
    }
}

export async function editUser(userData, token) {
    try {
        const response  = await api.put('users/me', userData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Http error in edit user: ',error);
        throw error;
    }
}

export async function getProducts() {
    try {
        const response = await api.get('/products/user/7');
        return response.data;
    } catch (error) {
        console.error('Http error in get products: ',error);
        throw error;
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
        const response = await api.get('/categories/user/7');
        return response.data;
    } catch (error) {
        console.error('Htto error in get Categories: ', error)
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

export async function editCategoryImage(categoryId, imageFile) {
    const authStore = useAuthStore();
    const token = authStore.token;

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await api.put(`categories/${categoryId}/image`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Http error in editCategoryImage:', error);
        throw error;
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
        throw error;
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
        console.error('Http error in get Address: ',error);
        throw error;
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
        console.error('Htttp errror in create Cart', error);
        throw error;
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
        console.error('Http error in get Cart: ',error);
        throw error;
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
        console.error('Http error in add item to cart: ',error);
        throw error;
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
        console.error('Http error in update item cart: ',error);
        throw error;
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
        console.error('Http error in remove item cart: ',error);
        throw error;
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
        console.error('Http errror in create Order:', error);
        throw error;
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
        console.error('Http errror in get Orders:', error);
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
        console.error('Http error to create coupom:',error);
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
        console.error('Http error in get Coupons:', error);
    }
}

export async function editCoupon(coupomId, coupomData, token) {
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

export async function deleteCoupon(coupomId, token) {
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
        throw error;
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
        console.error('Http error in create discount:', error);
        throw error;
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
        console.error('Http error in get discounts:', error);
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
        console.error('Http error in edit discount:', error);
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
        console.error('Http error in delete discount:', error);
    }
}
