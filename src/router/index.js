import Vue from 'vue'
import VueRouter from 'vue-router'
import Mauth from '../services/authmiddleware'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Expenses from '../views/Expenses.vue'
import DepositMaker from '../views/DepositMaker.vue'
import Payment from '../views/Payment.vue'
import DepositApprove from '../views/admin/DepositApprove.vue'
import ChecksControl from '../views/admin/ChecksControl.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/expenses',
    name: 'Expenses',
    component: Expenses,
    beforeEnter: Mauth.authCustumer,
  },
  {
    path: '/checkscontrol',
    name: 'ChecksControl',
    component: ChecksControl,
    beforeEnter: Mauth.authAdmin,
  },
  {
    path: '/depositapprove/:id',
    name: 'DepositApprove',
    component: DepositApprove,
    beforeEnter: Mauth.authAdmin,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    
  },
  {
    path: '/depositadd',
    name: 'DepositMaker',
    component: DepositMaker,
    beforeEnter: Mauth.authCustumer,    
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment,
    beforeEnter: Mauth.authCustumer,
  },
  {
    path: '/about',
    name: 'About',
    beforeEnter: Mauth.auth,
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router


/*
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
  '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
*/