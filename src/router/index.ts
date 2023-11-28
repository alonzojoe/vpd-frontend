import { createRouter, createWebHistory, useRoute } from "vue-router";
import RouteViewComponent from '../layouts/RouterBypass.vue'
import { useRouter } from "vue-router";
import Cookies from 'js-cookie';
import { app } from '../main'
import { useLoading } from '../pages/loader/loaderSettings'
import api from "../api";
import { decryptData } from '../composables'
const route = useRoute()
const routes = [
    {
        path: '/',
        name: 'auth',
        component: () => import('../pages/auth/Auth.vue'),
        meta: { requiresGuest: true }
    },

    {
        path: '/main',
        name: 'main',
        component: () => import('../layouts/AppLayout.vue'),
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'dashboard',
                component: () => import('../pages/admin/dashboard/Dashboard.vue'),
                meta: { title: 'Dashboard', requireRole: ['Administrator', 'Regular'] }
            },

            {
                path: 'patientprofiles',
                component: RouteViewComponent,
                meta: { title: 'Patients', requireRole: ['Administrator', 'Regular', 'Nurse'] },
                children: [
                    {
                        path: '',
                        name: 'patientlist',
                        component: () => import('../pages/patients/Patients.vue'),
                        meta: { title: 'Patient Profiles' }
                    },

                    {
                        path: '/registry/:data',
                        name: 'registry',
                        component: () => import('@/pages/patients/Registry.vue'),
                        meta: { title: 'Patient Profile' },
                        // props: (route) => ({ patientInfo: route.params.patientInfo })
                    }
                ]
            },

            {
                path: 'disease/:type',
                name: 'disease',
                component: () => import('@/pages/patients/DiseaseFormContainer.vue'),
                meta: { title: `Disease`, requireRole: ['Administrator', 'Regular', 'Nurse'] },
                props: true
            },

            {
                path: 'patients/:type',
                name: 'patients',
                component: () => import('@/pages/diseases/ListContainer.vue'),
                meta: { title: `Patient List`, requireRole: ['Administrator', 'Regular', 'Nurse'] },
                props: true
            },

            {
                path: 'settings',
                component: RouteViewComponent,
                meta: { title: 'Settings', requireRole: ['Administrator'] },
                children: [
                    {
                        path: 'roles',
                        name: 'roles',
                        component: () => import('../pages/admin/settings/Roles.vue'),
                        meta: { title: 'Roles', requireRole: ['Administrator'] }
                    },

                    {
                        path: 'users',
                        name: 'users',
                        component: () => import('../pages/admin/settings/Users.vue'),
                        meta: { title: 'User Management', requireRole: ['Administrator'] }
                    }
                ]
            },

            {
                path: 'linelists',
                name: 'linelists',
                component: () => import('@/pages/linelist/LineList.vue'),
                meta: { title: 'Patient Line List', requireRole: ['Administrator', 'Regular'] }
            },


            {
                path: 'registry',
                // name: 'registry',
                component: RouteViewComponent,
                children: [
                    {
                        path: '',
                        name: 'patient-registry',
                        component: () => import('../pages/admin/registry/Registry.vue'),

                    },
                    {
                        path: 'form/:type',
                        name: 'form',
                        // component: () => import('../pages/admin/registry/FormContainer.vue'),
                        props: true
                    }
                ]
            }
        ]
    },

    {
        path: '/pdf-viewer',
        name: 'pdf-viewer',
        component: () => import('../pages/printable_forms/Viewer.vue')
    },

    {
        path: '/line-list',
        name: 'line-list',
        component: () => import('../pages/printable_forms/PrintLineList.vue')
    },

    {
        path: '/unauthorized',
        name: 'unauthorized',
        component: () => import('../pages/404-pages/Unauthorized.vue')
    },


    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('../pages/404-pages/NotFound.vue')
    }
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

