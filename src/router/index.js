import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import HomeView from '../modules/HomeView.vue'
import { AccesoRoutes } from '@/modules/acceso/routes.js'
import { SistemaRoutes } from '@/modules/sistema/routes.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {name: 'IniciarSesion'}
  },
  ...AccesoRoutes,
  ...SistemaRoutes,
  { 
    path: '/:catchAll(.*)', 
    name: 'Error',
    component: HomeView
    // redirect: {name: 'ErrorSistema'},
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../modules/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiereAutenticacion)) 
  {
    if (store.state.acceso.autenticado) 
    {
      next();
    } 
    else 
    {
      next({ name: "IniciarSesion" });
    }
  } 
  else 
  {
    next();
  }
});

export default router
