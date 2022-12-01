<template>
    <div>
        <b-container>
            <h1 class="text-center my-4">Gestíon de Productos</h1>

            <b-alert v-model="mostrarAlerta" variant="success" dismissible>
                {{mensajeError}}
            </b-alert>

            <b-row align-h="end">
                <div class="botones-tabla">
                    <b-button variant="outline-primary" disabled>Ingreso de productos</b-button>
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
            title="Crear Producto"
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
                        v-model="producto.nombre"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    label="Presentación"
                >
                    <b-form-input
                        v-model="producto.presentacion"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    label="Marca"
                >
                    <b-form-select 
                        v-model="producto.codigoMarca" 
                        :options="marcas"
                        value-field="codigo"
                        text-field="nombre"
                    ></b-form-select>
                </b-form-group>

                <b-form-group
                    label="Categoría"
                >
                    <b-form-select 
                        v-model="producto.codigoCategoria" 
                        :options="categorias"
                        value-field="codigo"
                        text-field="nombre"
                    ></b-form-select>
                </b-form-group>

                <b-form-group
                    label="Precio"
                >
                    <b-form-input
                        v-model="producto.precio"
                        type="number"
                        min="1"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    label="IGV"
                >
                    <b-form-input
                        v-model="producto.igv"
                        type="number"
                        min="0"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    label="Afecta IGV"
                >
                    <b-form-checkbox v-model="producto.afectaIgv" switch>
                        {{(producto.afectaIgv)? "Sí" : "No"}} afecta
                    </b-form-checkbox>
                </b-form-group>

                <b-form-group
                    label="Stock"
                >
                    <b-form-input
                        v-model="producto.stock"
                        type="number"
                        min="1"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    label="Stock Mínimo"
                >
                    <b-form-input
                        v-model="producto.stockMinimo"
                        type="number"
                        min="1"
                        required
                    ></b-form-input>
                </b-form-group>
            </form>
        </b-modal>
        <!-- MODAL EDITAR -->
        <b-modal
            id="modal-editar"
            ref="modal-editar"
            title="Editar Producto"
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
                        v-model="producto.nombre"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    label="Presentación"
                >
                    <b-form-input
                        v-model="producto.presentacion"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    label="Marca"
                >
                    <b-form-select 
                        v-model="producto.codigoMarca" 
                        :options="marcas"
                        value-field="codigo"
                        text-field="nombre"
                    ></b-form-select>
                </b-form-group>

                <b-form-group
                    label="Categoría"
                >
                    <b-form-select 
                        v-model="producto.codigoCategoria" 
                        :options="categorias"
                        value-field="codigo"
                        text-field="nombre"
                    ></b-form-select>
                </b-form-group>

                <b-form-group
                    label="Precio"
                >
                    <b-form-input
                        v-model="producto.precio"
                        type="number"
                        min="1"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    label="IGV"
                >
                    <b-form-input
                        v-model="producto.igv"
                        type="number"
                        min="0"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    label="Afecta IGV"
                >
                    <b-form-checkbox v-model="producto.afectaIgv" switch>
                        {{(producto.afectaIgv)? "Sí" : "No"}} afecta
                    </b-form-checkbox>
                </b-form-group>

                <b-form-group
                    label="Stock Mínimo"
                >
                    <b-form-input
                        v-model="producto.stockMinimo"
                        type="number"
                        min="1"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    label="Activo"
                >
                    <b-form-checkbox v-model="producto.vigente" switch>
                        {{(producto.vigente)? "Sí" : "No"}}
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
            producto: {
                nombre: '',
                presentacion: '',
                urlImagen: 'https://via.placeholder.com/200x200.png/00bbee?text=cats+assumenda',
                precio: '',
                igv: '',
                afectaIgv: true,
                stock: '',
                stockMinimo: '',
                codigoMarca: null,
                codigoCategoria: null,
                vigente: ''
            },
            marcas: [],
            categorias: [],
            fields: [
                {
                    key: 'nombre',
                    label: 'Nombre',
                    sortable: true
                },
                {
                    key: 'precio',
                    label: 'Precio',
                    sortable: false,
                },
                {
                    key: 'stock',
                    label: 'Stock',
                    sortable: true,
                    // variant: 'danger'
                },
                { key: 'acciones', label: 'Acciones' }
            ],
            items: [
                // { 
                //     isActive: true, 
                //     precio: 40, 
                //     nombre: 'Dickerson', 
                //     stock: 'Macdonald', 
                //     // _rowVariant: 'danger' 
                // },
                // { 
                //     isActive: false, 
                //     precio: 21, 
                //     nombre: 'Larsen', 
                //     stock: 'Shaw', 
                //     // _cellVariants: { nombre: 'info', stock: 'warning' } 
                // },
            ]
        }
    },
    methods: {
        ...mapActions('sistema',['obtenerProductos', 'registrarProducto', 'obtenerMarcas', 'obtenerCategorias', 'obtenerProducto', 'editarProducto']),
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.nameState = valid
            return valid
        },
        mostrarModalNuevo()
        {
            this.obtenerDatos()
        },
        mostrarModalEditar(codigo)
        {
            this.obtenerDatos()
            this.obtenerProducto(codigo)
                .then((res)=>{
                    this.producto =  {
                        codigo: res.codigo,
                        nombre: res.nombre,
                        presentacion: res.presentacion,
                        urlImagen: 'https://via.placeholder.com/200x200.png/00bbee?text=cats+assumenda',
                        precio: res.precio,
                        igv: res.igv,
                        afectaIgv: (res.afectaIgv == 1) ? true : false,
                        stock: res.stock,
                        stockMinimo: res.stockMinimo,
                        codigoMarca: res.marca,
                        codigoCategoria: res.categoria,
                        vigente: (res.vigente == 1) ? true : false,
                    }
                })
        },
        obtenerDatos()
        {
            // obtenemos las categorias y marcas
            this.obtenerMarcas()
                .then((res)=>{
                    this.marcas = res
                })
            this.obtenerCategorias()
                .then((res)=>{
                    this.categorias = res
                })
        },
        resetModalNuevo() 
        {
            this.producto = {
                nombre: '',
                presentacion: '',
                urlImagen: 'https://via.placeholder.com/200x200.png/00bbee?text=cats+assumenda',
                precio: '',
                igv: '',
                afectaIgv: true,
                stock: '',
                stockMinimo: '',
                codigoMarca: null,
                codigoCategoria: null,
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
            this.registrarProducto(this.producto)
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
            this.editarProducto(this.producto)
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