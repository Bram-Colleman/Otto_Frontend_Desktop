import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        requiresAuth: true
      },
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/start',
      name: 'start',
      component: () => import('../views/StarterView.vue')
    },
    {
      path: '/residents',
      name: 'residents',
      meta: {
        requiresAuth: true
      },
      component: () => import('../views/ResidentsView.vue')
    },
    {
      path: '/routes',
      name: 'routes',
      meta: {
        requiresAuth: true
      },
      component: () => import('../views/RoutesView.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      meta: {
        requiresAuth: true
      },
      component: () => import('../views/ChatView.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      meta: {
        requiresAuth: true
      },
      component: () => import('../views/SettingsView.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (isAuth().then(result => {
      if(result) {
        next();
      } else {
        next({ name: 'start' });
      }
    })){
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})

async function isAuth() {
    let x = await fetch("https://otto-backend.onrender.com/api/eldercare/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await x.json();
    if (data.status == "success") {
      return true;
    } else {
      return false;
    }
  }

export default router
