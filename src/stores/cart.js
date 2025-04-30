import { defineStore } from "pinia";
import { addItemCart, getCart, removeItemCart, updateItemCart  } from "@/services/HttpService";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { getImg } from '@/utils/image';

export const useCreateCart = defineStore('cart', () => {
  const cartId = ref(null);
  const cartItems = ref([]);
  const totalAmount = ref(0);
  
  // Atualiza o estado da store do carrinho com os dados recebidos
  function updateCartState(response) {
    if (response && response.cart_id) {
      cartId.value = response.cart_id;

      cartItems.value = (response.items || []).map(item => ({
        ...item,
        image: getImg(item.image_path),
      }));
      totalAmount.value = response.total_amount || 0;
      localStorage.setItem("cartId", response.cart_id);
    }
  }

  // Inicializa o carrinho do usuário logado ao abrir a aplicação
  async function initCart(token, userId) {
    try {
      if (!token) {
        console.warn('Usuário não autenticado. Carrinho não foi carregado');
        return;
      }
      const response = await getCart(token); // Aqui só usa token, sem userId
      updateCartState(response);
    } catch (error) {
      console.error("Erro ao inicializar o carrinho:", error);
      // Se der erro ao buscar carrinho, cria um novo carrinho com userId
      if (userId) {
        try {
          await createCart(userId, token);
        } catch (createError) {
          console.error("Erro ao criar novo carrinho:", createError);
        }
      }
    }
  }
  

  // Permite definir os itens manualmente, se necessário
  function setCartItems(items) {
    cartItems.value = items;
  }

  // Adiciona item ao carrinho, verificando se já existe e depois atualiza a store
  async function addToCart({ productId, quantity, unitPrice }, ) {
    try {
      const token = useAuthStore().token;

      if (!token) {
        alert('Usuário não autenticado.');
        return;
      }

      const existingItem = cartItems.value.find(item => item.product_id === productId);
      if (existingItem) {
        alert('Produto já está no carrinho!');
        return;
      }

      await addItemCart({ product_id: productId, quantity, unit_price: unitPrice }, token);
      
      // Atualiza o estado do carrinho após adicionar
      const response = await getCart(token);
      updateCartState(response);
    } catch (error) {
      console.error('Error to add item in cartStore:', error);
    }
  }

  async function removeFromCart(item) {
    try {
      const token = useAuthStore().token;

      console.log('Removendo item do carrinho com ID:', item.id);

      await removeItemCart(item, token);

      const response = await getCart(token);
      updateCartState(response);
    } catch (error) {
      console.error("Erro ao remover item do carrinho:", error);
    }
  }

  async function incrementItemQuantity(productId){
    const token = useAuthStore().token;
    const item = cartItems.value.find( i => i.id === productId);
    if(item){
        item.quantity += 1;
        const data = { product_id: item.product_id, quantity: item.quantity };
        await updateItemCart(data, token);
        const response = await getCart(token);
        updateCartState(response);
    }
  }
  async function decrementItemQuantity(productId){
    const token = useAuthStore().token;
    const item = cartItems.value.find( i => i.id === productId);
    if(item && item.quantity > 1){
        item.quantity -= 1;
        const data = { product_id: item.product_id, quantity: item.quantity };
        await updateItemCart(data,token);
        const response = await getCart(token);
        updateCartState(response);
    }
  }
  function clearCart() {
    cartId.value = null;
    cartItems.value = [];
    totalAmount.value = 0;
    localStorage.removeItem("cartId");
    console.log("Cart has been cleared.");
}

  return {
    cartId,
    cartItems,
    totalAmount,
    initCart,
    setCartItems,
    addToCart,
    removeFromCart,
    incrementItemQuantity,
    decrementItemQuantity,
    clearCart
  };
}, {
  persist: true,
});
