import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import ManageGameView from '../views/ManageGameView.vue'
import UserView from '../views/UserView.vue'
import SignUpView from '../views/SignUpView.vue'
import SignInView from '../views/SignInView.vue'


const routes = [
  {
    path: '/',
    redirect: { path: "/games" },
    name: 'home',
    component: HomeView,
    children: [{
      path: "/games",
      name: "games",
      component: HomeView,
    }]
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignInView
  },
  {
  path: "/games/:slug",
  name: "game",
  component: GameView,
  },
  {
  path: "/games/:slug/edit",
  name: "edit",
  component: ManageGameView,
  },
  {
  path: "/users/profile",
  name: "user",
  component: UserView,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
