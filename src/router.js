import Vue from "vue";
import Router from "vue-router";

const Discovery = () => import('@/page/discovery')
const Songs = () => import('@/page/songs')

const Mvs = () => import('@/page/mvs')
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
  // {
  //   path: 'playlists',
  //   name: 'playlists',
  //   component: 
  // }
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
    ...menuRoutes,
  ],
});
