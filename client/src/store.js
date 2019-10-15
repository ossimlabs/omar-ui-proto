import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allSensors: ['AA', 'ACES_YOGI-HSI', 'GA', 'GE01', 'WV01', 'WV02', 'WV03'],
    allFilters: []
  },
  mutations: {
    addFilter (state, keyword) {
      console.log('state', state)
      console.log('keyword', keyword)
      state.allFilters.push(keyword)
    },
    removeFilter (state, keyword) {
      state.allFilters.splice(state.allFilters.indexOf(keyword), 1)
    },
    removeFromDropDown (state, keyword) {
      state.allSensors.splice(state.allSensors.indexOf(keyword.value), 1)
    },
    addToDropDown (state, keyword) {
      state.allSensors.push(keyword.value)
    }
  },
  getters: {
    // filtersList (state) {
    //   return state.allFilters
    // }
  },
  actions: {}
})