import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/dragAndDrop',
    name: 'DragAndDrop',
    component: () => import('../views/DragAndDrop.vue')
  },
  {
    path: '/calendar',
    name: 'Calendar',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Calendar')
  },
  {
    path: '/gridTest',
    name: 'GridTest',
    component: () => import('../views/GridTest')
  },
  {
    path: '/myEleTable',
    name: 'MyEleTable',
    component: () => import('../views/MyEleTable')
  },
  {
    path: '/flipper',
    name: 'Flipper',
    component: () => import('../views/Flipper')
  }
];

const router = new VueRouter({
  routes
});

export default router;
