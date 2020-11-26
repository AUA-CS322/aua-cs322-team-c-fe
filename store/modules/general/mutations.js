export default {
  setUser (state, payload) {
    state.user = payload
  },
  setPageTitle (state, payload) {
    state.pageTitle = payload
  },
  setChart (state, payload) {
    state.chart = payload
  },
  setSearchLoading (state, payload) {
    state.searchLoading = payload
  },
  setSearchItems (state, payload) {
    state.searchItems = payload
  }
}
