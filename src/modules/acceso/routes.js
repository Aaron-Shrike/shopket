import AccesoModule from '@/modules/acceso/AccesoModule.vue'
import IniciarSesionPage from '@/modules/acceso/pages/IniciarSesionPage.vue'

export const AccesoRoutes = [
    {
        path: '/',
        component: AccesoModule,
        children: [
            { 
                path: 'iniciar-sesion', 
                name: 'IniciarSesion',
                component: IniciarSesionPage
            },
        ],
    },
]