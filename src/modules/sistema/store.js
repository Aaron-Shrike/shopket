import axios from 'axios'

export const SistemaStore = {
    namespaced: true,
    state: {
        
    },
    getters: {
        
    },
    mutations: {
        
    },
    actions: {
        //PRODUCTOS
        async obtenerProductos()
        {
            const res = await axios.post('/api/productos', {})

            if(res.status == 200)
            {
                var productos = res.data.datos

                productos.forEach(element => {
                    if(element.stock <= element.stockMinimo)
                    {
                        element = Object.assign(element, {_cellVariants: { stock: 'danger' }})
                    }
                });

                return productos
            }
        },
        async obtenerProducto({commit}, codigo)
        {
            console.log(commit)
            const res = await axios.post('/api/producto', {codigo: codigo})

            if(res.status == 200)
            {
                return res.data.datos
            }
        },
        async registrarProducto({commit}, producto)
        {
            console.log(commit)
            const res = await axios.post('/api/registrar-producto', producto)

            if(res.status == 200)
            {
                return res.data.mensaje
            }
        },
        async editarProducto({commit}, producto)
        {
            console.log(commit)
            const res = await axios.post('/api/modificar-producto', producto)

            if(res.status == 200)
            {
                return res.data.mensaje
            }
        },
        //MARCAS
        async obtenerMarcas()
        {
            const res = await axios.post('/api/marcas', {})

            if(res.status == 200)
            {
                return res.data.datos
            }
        },
        async obtenerMarca({commit}, codigo)
        {
            console.log(commit)
            const res = await axios.post('/api/marca', {codigo: codigo})

            if(res.status == 200)
            {
                return res.data.datos
            }
        },
        async registrarMarca({commit}, marca)
        {
            console.log(commit)
            const res = await axios.post('/api/registrar-marca', marca)

            if(res.status == 200)
            {
                return res.data.mensaje
            }
        },
        async editarMarca({commit}, marca)
        {
            console.log(commit)
            const res = await axios.post('/api/modificar-marca', marca)

            if(res.status == 200)
            {
                return res.data.mensaje
            }
        },
        //CATEGORIAS
        async obtenerCategorias()
        {
            const res = await axios.post('/api/categorias-producto', {})

            if(res.status == 200)
            {
                return res.data.datos
            }
        },
        //VENTAS
        async obtenerVentas()
        {
            const res = await axios.post('/api/ventas', {})

            if(res.status == 200)
            {
                return res.data.datos
            }
        },
        
    },
}