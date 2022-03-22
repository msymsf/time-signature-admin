import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const Login = () => import('@/views/Login.vue')
const DataModel = () => import('@/views/DataModel')
const StudyModel = () => import('@/views/StudyModel')
const UserModel = () => import('@/views/UserModel')
const User = () => import('@/views/UserModel/User.vue')
const Role = () => import('@/views/UserModel/Role.vue')
const Course = () => import('@/views/StudyModel/Course.vue')
const Log = () => import('@/views/SystemModel/index.vue')
const Menu = () => import('@/views/SystemModel/Menu.vue')

const routes = [
  {
    path: '/',
    redirect: '/data'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/study',
    name: 'StudyModel',
    component: StudyModel,
  },
  {
    path: '/data',
    name: 'DataModel',
    component: DataModel
  },
  {
    path: '/online',
    name: 'UserModel',
    component: UserModel
  },
  {
    path: '/course',
    name: 'Course',
    component: Course
  },
  {
    path: '/user',
    name: 'user',
    component: User
  },
  {
    path: '/role',
    name: 'role',
    component: Role
  },
  {
    path: '/log',
    name: 'log',
    component: Log
  },
  {
    path: '/menu',
    name: 'menu',
    component: Menu
  },
]

//创建VueRouter
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//挂在路由导航守卫
router.beforeEach((to, from, next) => {
  //to 即将进来的路由
  //from 即将离开的路由
  //next 是否通行
  if (to.path === '/login') {
    return next();
  }
  const userFlag = store.state.userId
  if (!userFlag) {
    return next('/login');
  } else {
    return next();
  }
})

export default router

