import Vue from "vue";
import Router from "vue-router";

const Discovery = () => import('@/page/discovery')
const Songs = () => import('@/page/songs')
const Playlists = () => import('@/page/playlists')
const PlaylistDetail = () => import('@/page/playlist-detail')
const Mvs = () => import('@/page/mvs')
const Mv = () => import('@/page/mv')
const Search = () => import('@/page/search')
const SearchSongs = () => import('@/page/search/songs')
//内容需要居中的页面
export const LayoutCenterNames = ['discovery', 'songs', 'mvs']

//需要显示在侧边栏菜单的页面
export const menuRoutes = [
  {
    path: '/discovery',
    name: 'discovery', 
    component: Discovery,
    meta: { 
      title: '发现音乐',
      icon: 'music',
     }
  },
  {
    path: '/playlists',
    name: 'playlists',
    component: Playlists,
    meta: { 
      title: '推荐歌单',
      icon: 'playlist-menu'
    }
  },
  {
    path: '/songs',
    name: 'songs',
    component: Songs,
    meta: { 
      title: '最新音乐',
      icon: 'yinyue'
     }
  },
  {
    path: '/mvs',
    name: 'mvs',
    component: Mvs,
    meta: { 
      title: '最新MV',
      icon: 'mv'
     }
  }
]
Vue.use(Router);

export default new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      redirect: '/discovery',
    },
    {
      path: "/playlist/:id",
      name: 'playlist',
      component: PlaylistDetail
    },
    {
      path: '/mv/:id',
      name: 'mv',
      component: Mv,
      props: (route) =>  ({id: +route.params.id}),
    },
    {
      path: '/search/:keywords',
      name: 'search',
      component: Search,
      props: true,
      children: [
        {
          path: '/',
          redirect: 'songs',
        },
        {
          path: 'songs',
          name: 'searchSongs',
          component: SearchSongs,
        }
      ]
    },
    ...menuRoutes,
  ],
});
