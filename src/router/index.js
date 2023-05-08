import Vue from 'vue'
import Router from 'vue-router'

/* Components */
import Login from '@/components/views/Login'
import Register from '@/components/views/Register'

import Home from '@/components/views/Home'
import Profile from '@/components/views/Profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/login',    name: 'Login',    component: Login},
    {path: '/register', name: 'Register', component: Register},

    {path: '/',         name: 'Home',     component: Home},
    {path: '/profile',  name: 'Profile',  component: Profile},
  ]
})
