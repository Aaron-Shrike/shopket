<template>
    <div>
        <b-container class="contenedor-acceso">
            <b-row class="row-acceso" align-v="center">
                <b-col cols="12">
                    <b-card
                        class="card-formulario card-formulario-acceso"
                    >
                        <p class="titulo-h1 text-center">ShopKet</p>

                        <b-alert v-model="mostrarAlerta" variant="danger" dismissible>
                            {{mensajeError}}
                        </b-alert>

                        <b-form @submit.prevent="enviarDatosAcceso" v-if="show">
                            <b-form-group
                                id="input-group-1"
                                label="Correo :"
                                label-for="input-1"
                            >
                                <b-form-input
                                    id="input-1"
                                    v-model="form.correo"
                                    type="email"
                                    placeholder="admin@titanicsoft.com"
                                    required
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group id="input-group-2" label="Contraseña:" label-for="input-2">
                                <b-form-input
                                    id="input-2"
                                    v-model="form.contrasenia"
                                    type="password"
                                    placeholder="Ingrese su contraseña"
                                    required
                                ></b-form-input>
                            </b-form-group>

                            <b-overlay
								:show="efectoCargandoBoton"
								rounded
								opacity="0.6"
							>
								<b-button 
									:disabled="efectoCargandoBoton"
									type="submit" 
									class="boton boton-principal mt-3"
								>
									Iniciar Sesión
								</b-button>
							</b-overlay>
                        </b-form>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
// import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            efectoCargandoBoton: false,
            mostrarAlerta: false,
            mensajeError: '',
            form: {
                correo: 'aaronrv138@gmail.com',
                contrasenia: 'password',
            },
            show: true
        }
    },
    computed:{
        ...mapGetters('acceso', ['getUsuario']),
    },
    methods: {
        ...mapActions('acceso', ['iniciarSesion']),
        enviarDatosAcceso() 
        {
            // this.$v.form.$touch();

			// if(!this.$v.form.$anyError)
			// { 
				this.efectoCargandoBoton = true

                this.iniciarSesion(this.form)
                    .then(()=>{
                        this.$router.push({ name: "InicioSistema"})	
                    })
                    .catch((error) => 
                    {
                        this.MensajeDeError(error.response.data)
                    })
                    .finally(() => {
                        this.efectoCargandoBoton = false
                        // this.limpiarFormulario()
                    });
            // }
        },
        MensajeDeError(mensaje = "Error al conectar al servidor")
        {
            this.mostrarAlerta = true
            this.mensajeError = mensaje
        },
        limpiarFormulario() 
        {
            // Reset our form values
            this.form.correo = ''
            this.form.contrasenia = ''
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        }
    }
}
</script>

<style lang="css">
    .row-acceso{
        height: 100vh;
    }
    .card-formulario-acceso{
        max-width: 400px;
        margin: 0 auto;
    }
</style>