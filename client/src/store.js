import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allFilters: [
      {type: 'keyword', value: 'base filter 1'},
      {type: 'keyword', value: 'base filter 2'},
      {type: 'keyword', value: 'base filter 3'},
      {type: 'keyword', value: 'base filter 4'},
      {type: 'date',    value: '11/12/2013'},
      {type: 'date',    value: '12/12/2013'},
      {type: 'date',    value: '1/12/2013'},
      {type: 'date',    value: '4/6/2013'},
      {type: 'date',    value: '7/29/2013'},
    ]
  },
  mutations: {
    addFilter (state, keyword) {
      console.log('keyword', keyword)
      state.allFilters.push(keyword)
    },
    removeFilter (state, keyword) {
      state.allFilters.splice(state.allFilters.indexOf(keyword), 1)
    },
  },
  actions: {

  }
})
