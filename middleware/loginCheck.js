export default function ({ store, redirect }) {
  if (store.state.general.user) {
    return redirect('/profile')
  }
}
