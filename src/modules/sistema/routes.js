import SistemaModule from '@/modules/sistema/SistemaModule.vue'

import { SistemaGestionRoutes } from '@/modules/sistema/pages/gestion/routes.js'

import InicioSistemaPage from '@/modules/sistema/pages/InicioSistemaPage.vue'
import NuevaVentaPage from '@/modules/sistema/pages/NuevaVentaPage.vue'

export const SistemaRoutes = [
    {
        path: '/',
        name: 'Sistema',
        component: SistemaModule,
        children: [
            {
                path: 'inicio',
                name: 'InicioSistema',
                component: InicioSistemaPage,
            },
            {
                path: 'nueva-venta',
                name: 'NuevaVenta',
                component: NuevaVentaPage,
            },
            ...SistemaGestionRoutes
        ],
        meta: {
            requiereAutenticacion: false,
        },
    },
]