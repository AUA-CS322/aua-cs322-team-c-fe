export default function ({ store, redirect }) {
  if (store.state.general.user === null) {
    return redirect('/')
  }
}
