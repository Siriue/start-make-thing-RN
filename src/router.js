import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import login from './views/login.vue'
import profile from './views/profile.vue'
import user from './views/user.vue'
import userAdd from './views/userAdd.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    // {
    //   path: '/about',
    //   name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,
      children: [{
        path: '/user',
        name: 'user',
        component: user
      },{
        path: '/userAdd',
        name: 'userAdd',
        component: userAdd
      }]
    }
  ]
})
