import {
  createRouter,
  createWebHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ProductView from '../views/ProductView.vue'

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/product/:id',
      name: 'Product',
      component: ProductView,
      props: true, // Menggunakan props untuk menerima ID produk dari URL
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },

  ],
})

export default router