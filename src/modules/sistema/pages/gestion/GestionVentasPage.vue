<template>
    <div>
        <b-container>
            <h1 class="text-center my-4">Gestíon de Ventas</h1>

            <b-alert v-model="mostrarAlerta" variant="success" dismissible>
                {{mensajeError}}
            </b-alert>

            <b-row>
                <b-table 
                    striped 
                    hover 
                    :items="items" 
                    :fields="fields"
                >
                    <template #cell(precio)="row">
                        S/. {{ row.value }}
                    </template>
                    <template #cell(acciones)="row">
                        <b-button size="sm" variant="warning" @click="mostrarModalEditar(row.item.codigo)" v-b-modal.modal-editar>Editar</b-button>
                        <b-button size="sm" variant="danger" class="ml-1" disabled>Eliminar</b-button>
                    </template>
                </b-table>
            </b-row>
        </b-container>
        <!-- MODAL EDITAR -->
        <b-modal
            id="modal-editar"
            ref="modal-editar"
            title="Editar Categoría producto"
            @hidden="resetModalNuevo"
            @ok="okModalEditar"
            ok-title="Editar"
            ok-variant="warning"
            cancel-title="Cerrar"
            no-close-on-backdrop
        >
            <form ref="form" @submit.stop.prevent="enviarDatosModalEditar">

                <b-form-group
                    label="Activo"
                >
                    <b-form-checkbox v-model="venta.vigente" switch>
                        {{(venta.vigente)? "Sí" : "No"}}
                    </b-form-checkbox>
                </b-form-group>
            </form>
        </b-modal>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            mostrarAlerta: false,
            mensajeError: '',
            venta: {
                vigente: '',
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
        ...mapActions('sistema',['obtenerVentas', 'obtenerVenta', 'editarVenta']),
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
        this.obtenerVentas()
            .then((res)=>{
                this.items = res
            })
    },
}
</script>

<style>
    
</style>