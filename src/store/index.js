import Vue from 'vue'
import Vuex from 'vuex'

import { AccesoStore } from '@/modules/acceso/store.js'
import { SistemaStore } from '@/modules/sistema/store.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    acceso: { ...AccesoStore },
    sistema: { ...SistemaStore },
  }
})
