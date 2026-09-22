# E-commerce API — Vue 3

Aplicação de e-commerce full front-end construída a partir de um layout no Figma, cobrindo tanto a jornada do cliente quanto o painel administrativo em uma única base de código.

Desenvolvida com Vue 3 (Composition API), Vite e Pinia, com foco em organização de estado, consumo seguro de APIs REST e componentização real.

## Tecnologias

Vue 3 (Composition API) · Vite · Pinia · Vue Router · Tailwind CSS · Swiper.js · APIs REST com autenticação via Bearer Token

## Funcionalidades

**Loja (cliente)**
- Catálogo de produtos com busca client-side e carrossel de categorias (Swiper.js, com breakpoints responsivos)
- Carrinho de compras persistente entre sessões, vinculado ao usuário logado
- Cadastro e seleção de endereços de entrega
- Lista de favoritos persistente
- Acompanhamento de pedidos com histórico

**Painel administrativo**
- Controle de acesso por papel (admin/moderador), com renderização condicional na UI e criação de usuários moderadores
- CRUD completo de categorias, cupons e descontos
- Gestão de status de pedidos (pendente, processando, enviado, concluído, cancelado)
- Upload de imagem com drag-and-drop construído do zero, sem biblioteca externa

## Como funciona

### Autenticação

O token e os dados do usuário ficam em uma store dedicada (`auth.js`), persistida com `pinia-plugin-persistedstate`. No login, `saveUser` grava o usuário e o token, zera qualquer carrinho residual e inicializa o carrinho do usuário atual. No logout, o inverso acontece: token, usuário e carrinho são limpos juntos, evitando que dados de uma sessão vazem para a próxima.

```js
async function saveUser(result) {
  user.value = result.user;
  token.value = result.token;
  isAuthenticated.value = true;

  cartStore.cartItems = [];
  cartStore.cartId = null;
  cartStore.totalAmount = 0;

  await cartStore.initCart(token.value, result.user.id);
}

function logout() {
  token.value = null;
  user.value = {};
  isAuthenticated.value = false;
  cartStore.cartItems = [];
  cartStore.cartId = null;
  cartStore.totalAmount = 0;
}
```

O token dessa store é consumido por todas as demais stores que fazem chamadas autenticadas (produtos, pedidos, cupons, descontos, endereços), via `useAuthStore().token`.

### Upload de imagem

Categorias e produtos separam os dados textuais do arquivo de imagem. Na edição, os campos de texto são enviados como JSON; a imagem só é reenviada, via `FormData`, quando o campo `image` recebe um arquivo novo — evitando reprocessar a imagem em toda edição que não a envolve.

```js
async function createProductForm() {
  const auth = useAuthStore();
  const token = auth.token;

  if (id.value !== null) {
    const productData = {
      name: name.value,
      description: description.value,
      price: price.value,
      stock: stock.value,
      category_id: category_id.value,
    };

    const editResult = await editProduct(id.value, productData, token);

    if (image.value && image.value instanceof File) {
      await editProductImage(id.value, image.value, token);
    }

    return editResult;
  }

  const formData = getFormData();
  return await createProduct(formData);
}
```

A captura da imagem em si (arrastar e soltar, preview, limpeza) é feita por um componente próprio (`FileDrop.vue`), que expõe métodos ao componente pai via `defineExpose` para permitir carregar um preview existente durante uma edição.

### Produtos

Os produtos seguem o mesmo padrão usado em quase todas as entidades do projeto: uma store para escrita (`useCreateProducts`, com os campos do formulário e o submit) e uma store separada para leitura (`useGetProducts`, com a lista vinda da API). A busca por nome filtra os produtos já carregados em memória, sem nova chamada à API a cada tecla digitada.

```js
function searchProductsByName(query) {
  if (!query.trim()) return [];

  return products.value.filter((product) =>
    product.name.toLowerCase().includes(query.trim().toLowerCase())
  );
}
```

### Carrinho

O carrinho é persistido localmente (`pinia-plugin-persistedstate` + `cartId` salvo no `localStorage`) e sincronizado com o backend a cada alteração. Ao adicionar um item, a store primeiro verifica se ele já está no carrinho antes de chamar a API; ao incrementar ou decrementar quantidade, o estado local é atualizado e a API é chamada em seguida para manter os dois em sincronia.

```js
async function addToCart({ productId, quantity, unitPrice }) {
  const token = useAuthStore().token;
  if (!token) {
    alert('Usuário não autenticado.');
    return;
  }

  const existingItem = cartItems.value.find((item) => item.product_id === productId);
  if (existingItem) {
    alert('Produto já está no carrinho!');
    return;
  }

  await addItemCart({ product_id: productId, quantity, unit_price: unitPrice }, token);

  const response = await getCart(token);
  updateCartState(response);
}
```

## Arquitetura

- **Stores por domínio**: cada entidade (produto, categoria, cupom, desconto, endereço, pedido) tem sua própria store, separando responsabilidades de escrita e leitura — por exemplo, `useCreateAddress` versus `useGetAddress`
- **Persistência seletiva de estado**: carrinho, autenticação e favoritos usam `pinia-plugin-persistedstate`; o restante do estado é volátil por escolha
- **Camada de serviço centralizada** (`HttpService.js`) para todas as chamadas HTTP, com token injetado via `useAuthStore()`
- **Componentes reutilizáveis e semânticos**, com comunicação via `props`/`emits` e exposição controlada de métodos internos (`defineExpose`) quando necessário

## Organização

```
src/
├── components/   componentes reutilizáveis (produtos, formulários, upload, layout)
├── views/        páginas da aplicação, incluindo dashboard do moderador
├── stores/       stores Pinia, uma por domínio (produto, carrinho, pedido, etc.)
└── services/     camada de requisições HTTP com injeção de token
```

## Status atual

Projeto em desenvolvimento contínuo.

## Como rodar localmente

```sh
npm install
npm run dev
```

Build de produção:

```sh
npm run build
```