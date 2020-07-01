import Vue from "vue";
import Router from "vue-router";

const Discovery = () => import('@/page/discovery')
//内容需要居中的页面

//需要显示在侧边栏菜单的页面

Vue.use(Router);

export default new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      component: Discovery,
    },
  ],
});
