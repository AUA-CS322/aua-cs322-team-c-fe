import Vuex from 'vuex'
import general from './modules/general'

const createStore = () => {
  return new Vuex.Store({
    // namespaced: true,
    modules: {
      general
    }
  })
}

export default createStore
