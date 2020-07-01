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
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "./src/style/variables.scss";
        @import "~@/style/mixin.scss";
        `,
      },
    },
  },
};
