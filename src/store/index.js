import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const initailState = {
  qiniutoken: '',
}
const store = new Vuex.Store({
  state: initailState,
  mutations,
  actions,
  getters,
})

export default store