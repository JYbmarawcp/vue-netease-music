import store from "@/store"

export const hideMenuMixin = {
  created () {
    store.commit('music/setMenuShow', false)
  },
  beforeDestroy () {
    store.commit('music/setMenuShow', true)
  }
}