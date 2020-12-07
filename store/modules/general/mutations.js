export default {
  setUser(state, payload) {
    state.user = payload;
  },
  setProfile (state, payload) {
    state.profile = payload
  },
  setSearchLoading (state, payload) {
    state.searchLoading = payload
  },
  setSearchItems (state, payload) {
    state.searchItems = payload
  }
};
