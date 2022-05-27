import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },    
    {
      path: '/sanctions/persons/list',
      name: 'persons',
      component: () => import('../views/PersonsView.vue'),
      props: (route) => ({ search: route.query.search })
    },        
    {
      path: '/sanctions/organizations/list',
      name: 'organizations',
      component: () => import('../views/OrganizationsView.vue'),
      props: (route) => ({ search: route.query.search })
    },            
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
