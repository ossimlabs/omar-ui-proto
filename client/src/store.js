import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    filters: ['base filter 1', 'base filter 2', 'base filter 3'],
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
      state.filters.push(keyword)
    },
    removeFilter (state, keyword) {
      state.filters.splice(state.filters.indexOf(keyword), 1)
    },
    increment (state) {
      state.count++
    }
  },
  actions: {

  }
})
