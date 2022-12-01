import GestionProductosPage from '@/modules/sistema/pages/gestion/GestionProductosPage.vue'
import GestionMarcasPage from '@/modules/sistema/pages/gestion/GestionMarcasPage.vue'
import GestionCategoriasPage from '@/modules/sistema/pages/gestion/GestionCategoriasPage.vue'
import GestionVentasPage from '@/modules/sistema/pages/gestion/GestionVentasPage.vue'
import GestionClientePage from '@/modules/sistema/pages/gestion/GestionClientePage.vue'
import GestionUsuarioPage from '@/modules/sistema/pages/gestion/GestionUsuarioPage.vue'

export const SistemaGestionRoutes = [
    {
        path: 'gestion-productos',
        name: 'GestionProductos',
        component: GestionProductosPage,
    },
    {
        path: 'gestion-marcas',
        name: 'GestionMarcas',
        component: GestionMarcasPage,
    },
    {
        path: 'gestion-categorias-producto',
        name: 'GestionCategorias',
        component: GestionCategoriasPage,
    },
    {
        path: 'gestion-ventas',
        name: 'GestionVentas',
        component: GestionVentasPage,
    },
    {
        path: 'gestion-cliente',
        name: 'GestionCliente',
        component: GestionClientePage,
    },
    {
        path: 'gestion-usuario',
        name: 'GestionUsuario',
        component: GestionUsuarioPage,
    },
]