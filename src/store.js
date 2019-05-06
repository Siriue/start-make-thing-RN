import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataTransfer: null
  },
  mutations: {
    dataTransfer(state, dataTransfer) {
      state.dataTransfer = dataTransfer;
    }
  },
  actions: {

  }
})
