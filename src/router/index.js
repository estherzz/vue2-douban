import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Movie from '@/views/bookAudio/Movie.vue'

Vue.use(VueRouter)

const routes = [
  // home
  {
    path: '/',
    name: 'home',
    component:Home,
    children: [{
      path: '/',
      name:'recommend',
      component: () => import( '../views/home/Recommend.vue')
    },{
        path: '/dynamic',
        name:'dynamic',
        component: () => import('../views/home/Dynamic.vue')
    }]
  },
  // '/bookAudio'
  {
    path: '/bookAudio',
    name: 'bookAudio',
    component: () => import('../views/bookAudioHome.vue'),
    children: [
      {
        path: '/bookaudio',
        name: 'Movie',
        component: () => import('../views/bookAudio/Movie.vue'),
        // component: Movie
      },
      {
        path: '/bookaudio/book',
        name: 'Book',
        component: () => import('../views/bookAudio/Book.vue')
      },
      {
        path: '/bookaudio/tv',
        name: 'Tv',
        component: () => import('../views/bookAudio/Tv.vue')
        },
        {
          path: '/bookaudio/music',
          name: 'Music',
          component: () => import('../views/bookAudio/Music.vue')
        },
        {
          path: '/bookaudio/originalnovel',
          name: 'OriginalNovel',
          component: () => import('../views/bookAudio/OriginalNovel.vue')
        },
        {
          path: '/bookaudio/city',
          name: 'City',
          component: () => import('../views/bookAudio/City.vue')
        }
    ]
  },
  // '/group'
  {
    path: '/group',
    name: 'group',
    component: () => import('../views/GroupHome.vue'),
   
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('../views/ShopHome.vue'),
    children: [
      {
        path: '/',
        name: 'product',
        component:() => import( '../views/shop/Product.vue')
      },
      {
        path: '/time',
        name: 'time',
        component:() => import( '../views/shop/Time.vue')
      }
    ]
  },
  
  ]
  
  


const router = new VueRouter({
  routes
})

export default router
