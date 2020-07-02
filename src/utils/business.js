/**
 * 业务工具方法
 */

export function createSong (song) {
  const { id, name, img, artists, duration, albumId, albumName, mvId, ...rest } = song
  return {
    id,
    name,
    img,
    artists,
    duration,
    albumName,
    artistsText: getArtistsText(artists),
    //专辑 如果需要额外请求封面的话必须加上
    albumId,
    // mv的id 如果有的话会在songTable组件中加上mv链接
    mvId,
    ...rest
  }
}

export function getArtistsText(artists) {
  return (artists || []).map(({name}) => name).join('/')
}