import RouteViewComponent from '@/layouts/RouterBypass.vue'

const Routes = {
    path: '/main',
    name: 'main',
    component: () => import('@/layouts/AppLayout.vue'),
    meta: { requiresAuth: true },
    children: [
        {
            path: '',
            name: 'dashboard',
            component: () => import('@/pages/admin/dashboard/Dashboard.vue'),
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
                    component: () => import('@/pages/patients/Patients.vue'),
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
            path: 'laboratory',
            component: RouteViewComponent,
            meta: { title: 'Laboartory', requireRole: ['Administrator'] },
            children: [
                {
                    path: '',
                    name: 'lablinelist',
                    component: () => import('@/laboratory/SubmittedLinelist.vue'),
                    meta: { title: 'Laboratory Linelist', requireRole: ['Administrator'] }
                },
            ]
        },

        {
            path: 'settings',
            component: RouteViewComponent,
            meta: { title: 'Settings', requireRole: ['Administrator'] },
            children: [
                {
                    path: 'roles',
                    name: 'roles',
                    component: () => import('@/pages/admin/settings/Roles.vue'),
                    meta: { title: 'Roles', requireRole: ['Administrator'] }
                },

                {
                    path: 'users',
                    name: 'users',
                    component: () => import('@/pages/admin/settings/Users.vue'),
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
                    component: () => import('@/pages/admin/registry/Registry.vue'),

                },
                {
                    path: 'form/:type',
                    name: 'form',
                    // component: () => import('@/pages/admin/registry/FormContainer.vue'),
                    props: true
                }
            ]
        }
    ]
}

export default Routes;
