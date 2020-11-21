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

  // LOGOUT FUNCTION
  logout ({ commit }, payload) {
    this.$auth.logout()
    commit('setUser', null)
    this.$router.push('/')
  },

  // ACTION FUNCTION TO CALL setPageTitle MUTATION FROM PAGES
  setPageTitle ({ commit }, payload) {
    commit('setPageTitle', payload)
  },

  // CHECK IF USER'S TOKEN IS STILL VALID
  async getUser ({ commit, dispatch }, payload) {
    if (this.$auth.$state['token.local']) {
      let response = await this.$axios.$get('http://localhost:8080/users/user', {
        headers: {
          'Authorization': `${this.$auth.$state['token.local']}`
        }
      })
      .then(response => {
        commit('setUser', response)
      })
      .catch(error => {
        dispatch('logout')
      })
    }
  }
}
