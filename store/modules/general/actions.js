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

  search ({ commit }, payload) {
    if (this.$auth.$state['token.local']) {
      commit('setSearchLoading', true)
      return new Promise((resolve, reject) => {
        this.$axios.$get(`http://localhost:8080/search?query=${payload}`, {
          headers: {
            'Authorization': `${this.$auth.$state['token.local']}`
          }
        })
        .then(response => {
          commit('setSearchItems', response)
          commit('setSearchLoading', false)
        })
        .catch(error => {
          dispatch('logout')
          reject(error.response.data)
          commit('setSearchLoading', false)
          return
        })
      })
    }
    dispatch('logout')
  },

  getChart ({ commit }, payload) {
    if (this.$auth.$state['token.local']) {
      return new Promise((resolve, reject) => {
        this.$axios.$get(`http://localhost:8080/org-chart/${payload.username}`, {
          headers: {
            'Authorization': `${this.$auth.$state['token.local']}`
          }
        })
        .then(response => {

          commit('setChart', response)
        })
        .catch(error => {
          reject(error.response.data)
        })
      })
    }
    dispatch('logout')
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
