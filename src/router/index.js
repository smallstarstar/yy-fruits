import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/login';
import Home from '@/views/Home/Home';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component:Login
    },
   {
     path:'/home',
     component: Home,
     children:[
       {
         path:'userContainer',
         component: ()=>import('@/components/userContainer/userInfo')
       },
       {
         path:'userMessgage',
         component: ()=>import('@/components/userMessage/user-message')
       },
       {
         path:'fruitMessage',
         component: ()=>import('@/components/fruitMessage/fruitInfoComponent')
       },
       {
         path:'routerInfo',
         component: ()=>import('@/views/routerManager/router-manager')
       }
     ]
   }
  ]
})
