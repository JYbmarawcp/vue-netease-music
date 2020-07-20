export default {
  setCurrentSong(state, song) {
    state.currentSong = song
  },
  setCurrentTime(state, time) {
    state.currentTime = time
  },
  setPlayingState(state, playing) {
    state.playing = playing
  },
  setMenuShow(state, show) {
    state.isMenuShow = show
  },

  setPlaylist(state, playlist) {
    // const { isPlaylistShow, playlist: oldPlaylist } = state
    state.playlist = playlist
    // 播放列表未显示 并且两次播放列表的不一样 则弹出提示

  }
}