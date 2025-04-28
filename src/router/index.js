import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import CartView from '@/views/CartView.vue'
import Moderator from '@/views/Moderator.vue'
import Profile from '@/views/ProfileView.vue'
import FavoritesItemView from '@/views/FavoritesItemView.vue'
import ProductView from '../views/ProductView.vue'
import SearchResultsView from '@/views/SearchResultsView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      component: LoginView,
    },
    {
      path: '/cart',
      component: CartView,
    },
    {
      path:'/moderator',
      component: Moderator,
    },
    {
      path:'/profile',
      component: Profile
    },
    {
      path: '/favorites',
      component: FavoritesItemView
    },
    {
      path: '/product/:id',
      name: 'ProductView',
      component: ProductView,
    },
    {
      path: '/search/:query',
      name: 'SearchResultsView',
      component: SearchResultsView,
    }
  ],
})

export default router
