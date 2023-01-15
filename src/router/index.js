import {createRouter, createWebHashHistory} from 'vue-router'
import LoginView from '../views/LoginView.vue'
import SignUp from '../views/SignUp.vue'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/',
        name: 'signup',
        component: SignUp
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
