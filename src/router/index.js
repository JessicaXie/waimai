import Vue from 'vue'
import VueRouter from 'vue-router'
import MSite from '../pages/MSite/MSite'
import Profile from '../pages/Profile/Profile'
import Order from '../pages/Order/Order'
import Search from '../pages/Search/Search'
import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import Goods from '../pages/Shop/Goods/Goods'
import Info from '../pages/Shop/Info/Info'
import Rating from '../pages/Shop/Rating/Rating'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/msite',
      component: MSite,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods',
          component: Goods
        },
        {
          path: '/shop/rating',
          component: Rating
        },
        {
          path: '/shop/info',
          component: Info
        },
        {
          path: '/shop',
          redirect: '/shop/goods'
        }
      ]
    },
    {
      path: '/',
      redirect: '/msite'
    }
  ]
})
