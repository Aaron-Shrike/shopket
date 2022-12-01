<template>
    <div class="contenedor-sistema">
        <b-navbar toggleable="lg" type="dark" class="barra-navegacion">
            <b-navbar-brand :to="{name:'InicioSistema'}" class="titulo-h1">ShopKet</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item :to="{name:'NuevaVenta'}">Nueva Venta</b-nav-item>
                    <b-nav-item-dropdown text="Gestíon" right>
                        <b-dropdown-item :to="{name:'GestionProductos'}">Productos</b-dropdown-item>
                        <b-dropdown-item :to="{name:'GestionMarcas'}">Marcas</b-dropdown-item>
                        <b-dropdown-item :to="{name:'GestionCategorias'}">Categorías</b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item :to="{name:'GestionVentas'}">Ventas</b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item :to="{name:'GestionClientes'}">Clientes</b-dropdown-item>
                        <b-dropdown-item :to="{name:'GestionUsuarios'}">Usuarios</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <!-- <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form> -->

                    <!-- <b-nav-item-dropdown text="Lang" right>
                        <b-dropdown-item href="#">EN</b-dropdown-item>
                        <b-dropdown-item href="#">ES</b-dropdown-item>
                        <b-dropdown-item href="#">RU</b-dropdown-item>
                        <b-dropdown-item href="#">FA</b-dropdown-item>
                    </b-nav-item-dropdown> -->

                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <em>{{getUsuario.nombre}} {{getUsuario.apellidoPaterno}} {{getUsuario.apellidoMaterno}}</em>
                        </template>
                        <b-dropdown-item :to="{name: 'Perfil'}">Perfil</b-dropdown-item>
                        <!-- <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item :to="{name: 'CrearAnuncio'}">Productos</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'Anuncios'}">Marcas</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'Solicitudes'}">Categorías</b-dropdown-item> -->
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item @click.prevent="salirSistema">Cerrar sesión</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <router-view></router-view>
        <b-avatar icon="plus" size="4em" class="boton-flotante" :to="{name:'NuevaVenta'}"></b-avatar>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            
        }
    },
    computed:{
        ...mapGetters('acceso', ['getUsuario']),
    },
    methods: {
        ...mapActions('acceso', ['cerrarSesion']),
        salirSistema(){
            this.cerrarSesion().then(()=>{
                this.$router.push({ name: "IniciarSesion"})	
            })
        }
    },
}
</script>

<style>
    .contenedor-sistema{
        min-height: 100vh;
        position: relative;
    }
    .navbar.barra-navegacion{
        background-color: var(--color-principal);
    }
    .b-avatar.boton-flotante{
        position: fixed;
        bottom: 15px;
        right: 20px;
        background-color: var(--color-principal);
    }
</style>