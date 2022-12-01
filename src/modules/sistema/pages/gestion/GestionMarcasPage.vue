<template>
    <div>
        <b-container>
            <h1 class="text-center my-4">Gestíon de Marcas</h1>

            <b-alert v-model="mostrarAlerta" variant="success" dismissible>
                {{mensajeError}}
            </b-alert>

            <b-row align-h="end">
                <div class="botones-tabla">
                    <b-button variant="success" v-b-modal.modal-nuevo>Nuevo</b-button>
                </div>
            </b-row>
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
        <!-- MODAL NUEVO-->
        <b-modal
            id="modal-nuevo"
            ref="modal-nuevo"
            title="Crear Marca"
            @show="mostrarModalNuevo"
            @hidden="resetModalNuevo"
            @ok="okModalNuevo"
            ok-title="Registrar"
            ok-variant="success"
            cancel-title="Cerrar"
            no-close-on-backdrop
        >
            <form ref="form" @submit.stop.prevent="enviarDatosModalNuevo">
                <b-form-group
                    label="Nombre"
                    label-for="nombre-input"
                    invalid-feedback="Nombre es requerido"
                >
                    <b-form-input
                        id="nombre-input"
                        v-model="marca.nombre"
                        required
                    ></b-form-input>
                </b-form-group>
            </form>
        </b-modal>
        <!-- MODAL EDITAR -->
        <b-modal
            id="modal-editar"
            ref="modal-editar"
            title="Editar Marca"
            @hidden="resetModalNuevo"
            @ok="okModalEditar"
            ok-title="Editar"
            ok-variant="warning"
            cancel-title="Cerrar"
            no-close-on-backdrop
        >
            <form ref="form" @submit.stop.prevent="enviarDatosModalEditar">
                <b-form-group
                    label="Nombre"
                    label-for="nombre-input"
                    invalid-feedback="Nombre es requerido"
                >
                    <b-form-input
                        id="nombre-input"
                        v-model="marca.nombre"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    label="Activo"
                >
                    <b-form-checkbox v-model="marca.vigente" switch>
                        {{(marca.vigente)? "Sí" : "No"}}
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
            marca: {
                nombre: '',
                vigente: '',
            },
            fields: [
                {
                    key: 'nombre',
                    label: 'Nombre',
                    sortable: true
                },
                { key: 'acciones', label: 'Acciones' }
            ],
            items: []
        }
    },
    methods: {
        ...mapActions('sistema',['obtenerMarcas', 'obtenerMarca', 'registrarMarca', 'editarMarca']),
        mostrarModalNuevo()
        {
        },
        mostrarModalEditar(codigo)
        {
            this.obtenerMarca(codigo)
                .then((res)=>{
                    this.marca =  {
                        codigo: res.codigo,
                        nombre: res.nombre,
                        vigente: (res.vigente == 1) ? true : false,
                    }
                })
        },
        resetModalNuevo() 
        {
            this.marca = {
                nombre: '',
                vigente: '',
            }
        },
        okModalNuevo(bvModalEvent) {
            // evitar q el modal se cierre
            bvModalEvent.preventDefault()
            // enviar datos del modal
            this.enviarDatosModalNuevo()
        },
        okModalEditar(bvModalEvent) {
            // evitar q el modal se cierre
            bvModalEvent.preventDefault()
            // enviar datos del modal
            this.enviarDatosModalEditar()
        },
        enviarDatosModalNuevo() {
            // Exit when the form isn't valid
            // if (!this.checkFormValidity()) {
            //     return
            // }
            // Enviar datos para registrar
            this.registrarMarca(this.marca)
                .then((res)=>{
                    this.mensajeDeError(res)
                })
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide('modal-nuevo')
            })
        },
        enviarDatosModalEditar() {
            // Enviar datos para registrar
            this.editarMarca(this.marca)
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
        this.obtenerMarcas()
            .then((res)=>{
                this.items = res
            })
    },
}
</script>

<style>
    
</style>