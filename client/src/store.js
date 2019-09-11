import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    filters: ['filter1', 'filter2', 'filter3']
  },
  mutations: {
    addFilter (state, keyword) {
      state.filters.splice.push(keyword)
      console.log('new filter array', state.filters)
    },
    removeFilter (state, keyword) {
      state.filters.splice(state.filters.indexOf(keyword), 1)
      console.log('new filter array', state.filters)
    },
    increment (state) {
      state.count++
    }
  },
  actions: {

  }
})
