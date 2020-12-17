import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Ramme',
    component: () => import( '../views/Ramme.vue'),
    children: [
      {
        path: '',
        name: 'Forside',
        component: () => import( '../views/Forside.vue')
      },
      {
        path: '/archive',
        name: 'Arkiv',
        component: () => import( '../views/Arkiv.vue')
      },
      {
        path: '/menu',
        name: 'Menu',
        component: () => import( '../views/Drikkevarer.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( '../views/Login.vue')
  },
  {
    path: '/admin',
    name: 'AdminRamme',
    component: () => import( '../views/Admin/AdminRamme.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'Drikkevarer',
        component: () => import( '../views/Admin/Drikkevarer.vue'),
        meta: {
          requiresAuth: true
        },
      },
      {
        path: '/admin/logo',
        name: 'Logoer',
        component: () => import( '../views/Admin/Logoer.vue'),
        meta: {
          requiresAuth: true
        },
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

//hvis den side man er på vej imod har requiresAuth, tjekker der, om man er logget ind
router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    }
    else {
      next();
    }
  }
  else {
    next();
  }
});

//tilføjer titel til hjemmesiden
const titel = 'Tape Aarhus';
router.afterEach((to, from) => {
    Vue.nextTick(() => {
        document.title = to.meta.title || titel;
    });
});

export default router
