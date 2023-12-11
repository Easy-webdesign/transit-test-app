import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '@/pages/Auth'
import Contacts from '@/pages/Contacts'

Vue.use(VueRouter);

// Задаем роута приложения для страниц авторизации и контактов
const routes = [
  { path: '/', name: 'auth', component: Auth},
  { path: '/contacts', name: 'contacts', component: Contacts}
]

// Создаем объект router 
const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
