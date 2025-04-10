import { defineStore } from "pinia";
import { addItemCart, getCart } from "@/services/HttpService";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { getImg } from '@/utils/image';

export const useCreateCart = defineStore('cart', () => {
  const cartId = ref(null);
  const cartItems = ref([]);

  // Atualiza o estado da store do carrinho com os dados recebidos
  function updateCartState(response) {
    if (response && response.cart_id) {
      cartId.value = response.cart_id;

      cartItems.value = (response.items || []).map(item => ({
        ...item,
        image: getImg(item.image_path),
      }));

      localStorage.setItem("cartId", response.cart_id);
    }
  }

  // Inicializa o carrinho do usuário logado ao abrir a aplicação
  async function initCart() {
    try {
      const token = useAuthStore().token;

      // Somente o usuário logado possui um token
      if (!token) {
        console.warn('Usuário não autenticado. Carrinho não foi carregado');
        return;
      }

      const response = await getCart(token);
      updateCartState(response);
    } catch (error) {
      console.error("Erro ao inicializar o carrinho:", error);
    }
  }

  // Permite definir os itens manualmente, se necessário
  function setCartItems(items) {
    cartItems.value = items;
  }

  // Adiciona item ao carrinho, verificando se já existe e depois atualiza a store
  async function addToCart({ productId, quantity, unitPrice }) {
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
      console.error('Erro ao adicionar item ao carrinho:', error);
    }
  }

  function incrementItemQuantity(productId){
    const item = cartItems.value.find( i => i.id === productId);
    if(item){
        item.quantity += 1;
    }
  }
  function decrementItemQuantity(productId){
    const item = cartItems.value.find( i => i.id === productId);
    if(item && item.quantity > 1){
        item.quantity -= 1;
    }
  }

  return {
    cartId,
    cartItems,
    initCart,
    setCartItems,
    addToCart,
    incrementItemQuantity,
    decrementItemQuantity
  };
}, {
  persist: true,
});
