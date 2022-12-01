<template>
    <b-card class="card-producto" :title="datosProducto.nombre" :img-src="datosProducto.urlImagen" img-alt="Image" img-top>
        <b-card-text>
            <b-form-spinbutton id="demo-sb" v-model="canastaProducto.cantidad" min="1" max="100"></b-form-spinbutton>
        </b-card-text>
        <template #footer>
            <b-button variant="success">Agregar</b-button>
        </template>
    </b-card>
</template>
<script>
export default {
    data() {
        return {
            canastaProducto: {
                codigo: '',
                cantidad: 1,
            }
        }
    },
    props: [
        'datosProducto',
    ],
}
</script>
<style>
    .card-producto{
        min-height: 500px;
        margin-bottom: 1.5rem;
        /* height: 100%; */
    }
</style>