import {getPlayList,topPlayList} from 'api/api.js'
import PlayListItem from "../views/play-list/child/PlayListItem";
import {Loading, Toast} from "vant";
import {mapGetters} from 'vuex'
export const mixin = {
  components: {
    PlayListItem,
    VanLoading: Loading
  },
  data() {
    return {
      list: [],
      count: 30,
      load: false,
      cat: '全部',
      obj: {coverImgUrl: ''}
    }
  },
  computed: {
    ...mapGetters(['getSongObj'])
  },
  methods: {
    asyncGetPlayList(num) {
      this.load = true
      topPlayList(num, this.cat).then(res => {
        if(res.code === 200) {
          if(this.list.length == 0) {
            if(res.playlists.length == 0) {
              this.load = false
              return Toast('没有找到该标签的api接口，所以暂无数据')
            }
            this.obj.coverImgUrl = res.playlists[0].coverImgUrl
            this.$emit('changeimg',this.obj)
            // this.$emit('setActiveImg', this.obj.coverImgUrl)
          }
          this.list.push(...res.playlists.filter((item,index) => index >= this.list.length))
          this.$refs.playScroll.finishPullUp()
          this.$refs.playScroll.scroll.refresh()
          this.count = this.list.length
          this.load = false
        }
      })
    },
    pullingUp(scroll) {
      this.asyncGetPlayList(this.count + 30)
    }
  },
  mounted() {
    // 这里这么做的原因是在标签分类里面如果添加或者删除了某标签的话，那么页面会进行重新渲染，那么久需要重新获取一次值
    if(this.currentIndex === this.index && this.list.length == 0) {
      this.asyncGetPlayList(this.count)
    }
  },
  watch: {
    currentIndex(val,oldVal) {
      if(val === this.index && this.list.length == 0) {
        // 调用混入中的方法
        return this.asyncGetPlayList(this.count)
      } else if(val === this.index) {
        this.$emit('changeimg', this.obj)
        // this.$emit('setActiveImg', this.obj.coverImgUrl)
      }
    },
    getSongObj() {
      this.$refs.contain.style.paddingBottom = '45px'
    }
  }
}