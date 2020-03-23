---
replace: !!js/regexp /[^]*?/
---

<%_ if (options.hasRouter) { _%>
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/401',
    name: 'Unauthorized',
    component: () => import('@/views/errors/401.vue')
  },
  {
    path: '/404',
    name: 'Notfound',
    component: () => import('@/views/errors/404.vue')
  },
  { path: '*', redirect: '/404' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 路由鉴权校验
  next()
})

export default router
<%_ } _%>
