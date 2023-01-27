import {createRouter, createWebHistory} from 'vue-router'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import SignUpSuccessView from '../views/SignUpSuccessView.vue'
import DashboardView from '../views/DashboardView.vue'
import ChartView from '../views/ChartView.vue'

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignUpView
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardView,
        children: [{
            path: 'chart',
            name: 'chart',
            component: ChartView
        }]
    },
    {
        path: '/signup-success',
        name: 'signup-success',
        component: SignUpSuccessView
    },
    {
        path: '/:notFound(.*)',
        component: NotFoundView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
