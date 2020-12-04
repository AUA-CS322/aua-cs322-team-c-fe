import Cookies from 'vue-cookies'

export default {
  // NUXT JS CALLS THIS FUNCTION ON APP INIT
  // USED TO CHECK USER'S ACCESS TOKEN
  async nuxtServerInit ({ commit, dispatch }, { error }) {
    await dispatch('getUser')
  },


  // LOGIN USER FUNCTION
  onLogin ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('http://localhost:8080/authenticate', payload)
        .then(response => {
          this.$auth.setUserToken(response.token)
          return this.$axios.$get('http://localhost:8080/users/user', {
            headers: {
              'Authorization': `Bearer ${response.token}`
            }
          })
        })
        .then(user => {
          commit('setUser', user)
          resolve(user)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },


}
