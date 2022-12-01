import axios from 'axios'

export const AccesoStore = {
    namespaced: true,
    state: {
        autenticado: false,
        usuario: {
            apellidoMaterno: "Vera",
            apellidoPaterno: "Rojas",
            celular: "978488529",
            codigoCliente: 1,
            dni: "73976770",
            nombre: "Aarón",
            tipo: "ADM",
            urlImagen: "imagen.jpg",
        },
    },
    getters: {
        getAutenticado: (state)  => {
            return state.autenticado;
        },
        getUsuario: (state)  => {
            return state.usuario;
        },
    },
    mutations: {
        SET_USUARIO(state, payload){
            state.usuario = payload;
        },
        UNSET_USUARIO(state){
            state.usuario = null;
        },
        SET_AUTENTICADO(state, payload){
            state.autenticado = payload;
        },
        UNSET_AUTENTICADO(state){
            state.autenticado = false;
        },
    },
    actions: {
        async iniciarSesion({commit}, payload)
        {
            const res = await axios.post('/api/iniciar-sesion', payload)

            if(res.status == 200)
            {
                commit('SET_AUTENTICADO', true);
                commit('SET_USUARIO', res.data.datos);
            }
        },
        cerrarSesion({commit})
        {
            commit('UNSET_AUTENTICADO');
            commit('UNSET_USUARIO');
        }
    },
}