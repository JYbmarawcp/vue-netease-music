<script>
import { pad, goMvWithCheck } from "@/utils"
export default {
  props: {
    hideColumns: {
      type: Array,
      default: () => []
    },
    songs: {
      type: Array,
      default: () => [] 
    },
    highlightText: {
      type: Sring,
      default: "",
    },
    // 名字下面渲染的额外内容
    renderNameDesc: {
      type: Function,
    },
  },
  data () {
    const commonHighlightSlotScopes = {
      default: scope => {
        const text = scope.row[scope.column.property]
        return (
          <highlightText 
            class="song-table-name"
            text={text}
            highlightText={this.highlightText}
          />
        )
      }
    }
    return {
      columns: [
        {
          prop: "index",
          lable: "",
          width: "70",
          scopedSlots: {
            default: scope => {
              return(
                <div class="index-wrap">
                  {this.isActiveSong(scope.row) ? (
                    <Icon class="horn" type="horn" color="theme" />
                  ) : (
                    // 补上左边的0
                    <span>{pad(scope.$index + 1)}</span>
                  )}
                </div>
              )
            }
          }
        },
        {
          prop: "img",
          lable: "",
          width: "100",
          scopedSlots: {
            default: scope => {
              return (
                <div class="img-wrap">
                  <img src="scope.row.img" />
                  <PlayIcon class="play-icon" />
                </div>
              )
            }
          }
        },
        {
          prop: "name",
          lable: "音乐标题",
          className: "title-td",
          scopedSlots: scope => {
            const {
              row: { mvId },
            } = scope

            return (
              <div>
                <div class="song-table-name-cell">

                </div>
              </div>
            )
          }
        },
        {
          prop: "artistsText",
          lable: "歌手",
          scopedSlots: commonHighlightSlotScopes
        },
        {
          prop: "albumName",
          lable: "专辑",
          scopedSlots: commonHighlightSlotScopes
        },
        {
          prop: "durationSecond",
          lable: "时长",
          width: "100",
          scopedSlots: {
            default: scope => {
              return (
                <span>
                  {this.$utils.formatTime(scope.row.durationSecond)}
                </span>
              )
            }
          }
        }
      ]
    }
  },
  methods: {
    onRowClick(song) {
      
    },
    isActiveSong(song) {
      return song.id === this.currentSong.id
    }
  },
  render() {
    const tableAttrs = {
      attrs,
      on: {

      }
    }
    return this.songs.length ? (
      <el-table class="song-table">

      </el-table>
    ) : null
  }
}
</script>

<style>

</style>