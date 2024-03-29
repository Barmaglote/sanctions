import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';


// TODO: subcategories/subfolders - all logins/password in 1 subfolder

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
    },            
    {
      path: '/charity',
      name: 'charity',
      component: () => import('../views/LinksView.vue'),
      props: (route) => ({ search: route.query.search })
    },            
    {
      path: '/media/:type',
      name: 'media',
      component: () => import('../views/MediaView.vue'),
      props: (route) => ({ search: route.query.search })
    },            
    {
      path: '/navalny',
      name: 'navalny',
      component: () => import('../views/NavalnyView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },    
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/registered',
      name: 'registered',
      component: () => import('../views/RegisteredView.vue')
    },
    {
      path: '/changepassword',
      name: 'changepassword',
      component: () => import('../views/ChangePasswordView.vue')
    },
    {
      path: '/passwordchanged',
      name: 'passwordchanged',
      component: () => import('../views/PasswordChanged.vue')
    },
    {
      path: '/requestrestore',
      name: 'requestrestore',
      component: () => import('./../views/RequestRestore.vue')
    },
    {
      path: '/restore',
      name: 'restore',
      component: () => import('./../views/Restore.vue')
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: () => import('./../views/PasswordConfirmation.vue')
    },
    
  ]
})

export default router
