import Vue from 'vue'
import Vuex from 'vuex'
import companyInfo from './modules/companyInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    companyInfo
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: []
})
