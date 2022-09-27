import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LocalCache from '@/utils/cache'
const login = ()=>import('@/views/login/login.vue')
const main = ()=>import('@/views/main/main.vue')
const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    redirect:'/main'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/main',
    name: 'main',
    component: main
  },
  {
    path:'/:pathMatch(.*)*',
    name:'not-found',
    component:()=>import('@/views/not-found/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to)=>{
if(to.path !== '/login'){
  const token = LocalCache.getCache('token')
  if(!token){
    return '/login'
  }
}
})

export default router
