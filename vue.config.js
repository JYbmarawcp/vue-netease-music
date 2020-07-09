const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // '@': 'src'默认配过了
        assets: "@/assets",
        base: "@/base",
        components: "@/components",
        style: "@/style",
        utils: "@/utils",
        page: "@/page",
      },
    },
    externals: isProd ? {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
    }: {},
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "~@/style/variables.scss";
          @import "~@/style/mixin.scss";
        `,
      },
    },
  },
};
