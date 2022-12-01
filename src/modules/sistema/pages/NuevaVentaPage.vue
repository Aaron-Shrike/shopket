<template>
    <div>
        <b-container>
            <h1 class="text-center my-4">Nueva Venta</h1>

            <b-alert v-model="mostrarAlerta" variant="success" dismissible>
                {{mensajeError}}
            </b-alert>

            <b-row align-h="center" class="mb-3">
                <div>
                    <form ref="form" @submit.prevent="buscarCliente">
                        <b-form-group
                            label="DNI"
                        >
                            <b-form-input
                                v-model="cliente.dni"
                                required
                            ></b-form-input>
                        </b-form-group>
                        <b-button type="submit">Buscar</b-button>
                        <b-button variant="success" class="ml-2">Nuevo</b-button>
                    </form>
                </div>
            </b-row>

            <b-row>
                <b-col cols="3"
                    class="contenedor-producto"
                    v-for="(producto,index) in items"
                    :key="index"
                >
                    <producto
                        :datosProducto="producto"
                        @agregarProducto="AgregarProductoCanasta($event)"
                    />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import Producto from '@/modules/sistema/components/ProductoComponent.vue'
import { mapActions } from 'vuex'

export default {
    components: {
        Producto,
    },
    data() {
        return {
            mostrarAlerta: false,
            mensajeError: '',
            cliente: {
                dni: '',
            },
            fields: [
                {
                    key: 'fecha',
                    label: 'Fecha',
                    sortable: true
                },
                { key: 'acciones', label: 'Acciones' }
            ],
            items: []
        }
    },
    methods: {
        ...mapActions('sistema',['obtenerProductos', 'obtenerCliente', 'registrarVenta']),
        mostrarModalNuevo()
        {
        },
        mostrarModalEditar(codigo)
        {
            this.obtenerVenta(codigo)
                .then((res)=>{
                    this.venta =  {
                        codigo: res.codigo,
                        vigente: (res.vigente == 1) ? true : false,
                    }
                })
        },
        resetModalNuevo() 
        {
            this.venta = {
                vigente: '',
            }
        },
        okModalEditar(bvModalEvent) {
            // evitar q el modal se cierre
            bvModalEvent.preventDefault()
            // enviar datos del modal
            this.enviarDatosModalEditar()
        },
        enviarDatosModalEditar() {
            // Enviar datos para registrar
            this.editarVenta(this.venta)
                .then((res)=>{
                    this.mensajeDeError(res)
                })
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide('modal-editar')
            })
        },
        mensajeDeError(mensaje = "Error al conectar al servidor")
        {
            this.mostrarAlerta = true
            this.mensajeError = mensaje
        },
    },
    mounted() {
        this.obtenerProductos()
            .then((res)=>{
                this.items = res
            })
    },
}
</script>

<style>
    
</style>