import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import CartView from '@/views/CartView.vue'
import Moderator from '@/views/Moderator.vue'
import Profile from '@/views/ProfileView.vue'
import FavoritesItemView from '@/views/FavoritesItemView.vue'
import ProductView from '../views/ProductView.vue'
import SearchResultsView from '@/views/SearchResultsView.vue'
import AccessDeniedView from '@/views/AccessDeniedView.vue'
import { useAuthStore } from '@/stores/auth.js'




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
      meta: { requiresAdmin: true }
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
    },
    {
      path: '/access-denied',
      name: 'AccessDeniedView',
      component: AccessDeniedView,
    }
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (to.meta.requiresAdmin) {
    if (!auth.isAuthenticated || auth.user.role !== 'ADMIN') {
      next({ path: '/access-denied' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
