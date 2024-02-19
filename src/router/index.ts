import { createRouter, createWebHistory, useRoute } from "vue-router";
import { useRouter } from "vue-router";
import Cookies from 'js-cookie';
import { app } from '@/main'
import { useLoading } from '@/pages/loader/loaderSettings'
import api from "@/api";
import { decryptData } from '@/composables'
import Routes from './routes'
const route = useRoute()
const routes = [
    {
        path: '/',
        name: 'auth',
        component: () => import('@/pages/auth/Auth.vue'),
        meta: { requiresGuest: true }
    },

    {
        path: '/pdf-viewer',
        name: 'pdf-viewer',
        component: () => import('@/pages/printable_forms/Viewer.vue')
    },

    {
        path: '/line-list',
        name: 'line-list',
        component: () => import('@/pages/printable_forms/PrintLineList.vue')
    },

    {
        path: '/unauthorized',
        name: 'unauthorized',
        component: () => import('@/pages/404-pages/Unauthorized.vue')
    },


    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/pages/404-pages/NotFound.vue')
    },
    Routes
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const { startLoading, stopLoading } = useLoading()

router.beforeEach((to, from) => {
    startLoading()
    //Dynamic Title
    if (to.name === 'disease' || to.name === 'patients') {
        const patients = to.name == 'patients' ? ' Patient List' : ''
        if (to.params.type) {

            let title = null
            if (to.params.type == 'rota') {
                title = `Rota Virus${patients}`
            } else if (to.params.type == 'meningitis') {
                title = `Meningitis-Encephalitis${patients}`
            } else if (to.params.type == 'measles') {
                title = `Measles-Rubella${patients}`
            } else {
                title = '404'
            }

            to.meta.title = `${title}`;

        } else {

            to.meta.title = 'Disease';
        }
    }
    //Route Guard
    const authenticated = Cookies.get('auth_token')
    api.defaults.headers.common['Authorization'] = `Bearer ${authenticated}`
    if (to.meta.requiresGuest && authenticated) {

        return { name: 'dashboard' };
    } else if (to.meta.requiresAuth && !authenticated) {

        Cookies.remove('auth_token');
        return { name: 'auth' };
    } else if (to.meta.requireRole) {


        if (authenticated) {


            try {
                const authUser = decryptData(localStorage.getItem('userData'))
                const currentRole = authUser.role
                const requiredRoles = to.meta.requireRole;

                const userRole = currentRole;

                if (requiredRoles.includes(userRole)) {

                    return;
                } else {

                    return { name: 'unauthorized' }; // Redirect to an unauthorized page
                }
            } catch (error) {
                return { name: 'auth' }
            }



        } else {

            return { name: 'auth' }; // Redirect to the login page
        }
    } else {

        return;

    }



    // if (to.meta.requiresGuest && authenticated) {
    //     //next({name: 'main'})
    //     console.log('authuser from router', authUser)
    //     return {
    //         name: 'dashboard'
    //     }
    // }else if (to.meta.requiresAuth && !authenticated){
    //     Cookies.remove('auth_token')
    //     return {
    //         name: 'auth'
    //     }
    // }


})

router.afterEach((to, from) => {
    // console.log('authuser from router', currentRole)
    setTimeout(() => {
        stopLoading()
    }, 500);

});


export default router;

