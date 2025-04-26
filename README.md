## Ecommerce-API 🛒

Projeto de e-commerce construído com Vue 3, Vite e Pinia, focado em performance, organização de código e boas práticas no consumo de APIs REST.

Este projeto está em desenvolvimento, com o objetivo de demonstrar habilidades práticas em construção de componentes reutilizáveis, controle de estado com Pinia e integração com endpoints seguros usando autenticação via token.

## ✨ Tecnologias & Conceitos Aplicados
Vue 3 com Composition API

Pinia para gerenciamento de estado

Consumo de APIs RESTful com autenticação via Bearer Token

Componentes reutilizáveis e semânticos

Requisições organizadas em camada de serviço (HttpService.js)

Estrutura modular de diretórios

Estilização com Tailwind CSS

Mobile-first e design responsivo

Commits semânticos

## 📁 Organização

src/components: componentes reutilizáveis (ex: produtos, formulários, botões)

src/views: páginas da aplicação, como Dashboard do moderador

src/stores: stores da aplicação com Pinia

src/services: camada de requisições HTTP (seguindo padrão de injeção de token)

## 📌 Status Atual
Atualmente focado na implementação de funcionalidades para gerenciamento de cupons e descontos, com total integração à API e fluxo completo de criação, edição e exibição no front-end.
Além disso, o layout está sendo otimizado para garantir excelente experiência em dispositivos móveis.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
