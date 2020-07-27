export default function lyricParser (lrc) {
  return {
    'lyric': parseLyric(lrc.lrc.lyric || ''),
    'tlyric': parseLyric(lrc.tlyric.lyric || ''),
    'lyricuser': lrc.lyricUser,
    'transUser': lrc.transUser,
  }
}

export function parseLyric (lrc) {
  const lyrics = lrc.split('\n')
  const lrcObj = []
  for (let i = 0; i < lyrics.length; i++) {
    const lyric = decodeURIComponent(lyrics[i])
    const timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g
    const timeRegExpArr = lyric.match(timeReg)
    if (!timeRegExpArr) continue
    const content = lyric.replace(timeReg, '')
    for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
      const t = timeRegExpArr[k]
      const min = Number(String(t.match(/\[\d*/i)).slice(1))
      const sec = Number(String(t.match(/:\d*/i)).slice(1))
      const time = min * 60 + sec
      if (content !== '') {
        lrcObj.push({ time: time, content })
      }
    }
  }
  return lrcObj
}

// lyric: "[00:00.000] 作曲 : 爱星人↵[00:00.826] 作词 : 爱星人↵[00:02.478]作曲：爱星人↵[00:03.559]作词：爱星人↵[00:04.533]编曲：爱星人↵[00:05.642]吉他：爱星人，Jeff（菲律宾），庄高你很爱我↵[02:59.643]只是那爱情出错↵[03:04.540]爱如天气如火花的你↵[03:09.193]在心中与我对望OH↵[03:21.274]在心中与我对望 Woo ~↵[03:26.559]爱与你对望 Woo ~↵[03:31.411]爱与你对望↵[03:33.455]Shorty↵[03:34.939]you gotta get that↵[03:36.483]Sometimes Men will go little whack↵[03:40.124]they just wanna find a Hera（赫拉女神，宙斯妻子）↵[03:42.265]but can‘t take a moment to get to know her↵[03:45.689]Don't worry↵[03:47.238]I'm not one of their kind.Everything will be fine.↵"
// tlyric: "[59]↵[03:31.411]↵[03:33.455]Shtory↵[03:34.939]你要明白↵[03:36.483]有时男人会变得失常↵[03:40.124]他们只中意追寻赫拉↵[03:42.265]但却不能费时体会她↵[03:45.689]不要担心↵[03:47.238]我不是他们中的一员 一切都会好的↵"

