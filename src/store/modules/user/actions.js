import storage from 'good-storage'
import { getUserDetail, getUserPlaylist } from "@/api"

export default {
  async login({ commit }, uid) {
    const error = () => {
      return false
    }

    try {
      const user = await getUserDetail(uid)
      const { profile } = user
      commit('setUser', profile)
      storage.set(UID_KEY, profile.userId)
    } catch (error) {
      return error()
    }

    const { playlist } = await getUserPlaylist(uid)
    commit('setUserPlaylist', playlist)
    return true
  }
}