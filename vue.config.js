const path = require("path")
const resolve = dir => path.join(__dirname, dir);
module.exports = {
  lintOnSave: false,
  parallel: require("os").cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。

  css: {
    loaderOptions: {
      scss: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: `@import "@scss/variables.scss";`
      }
    }
  },

  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true)

    // 添加别名
    config.resolve.alias
      .set("vue$", "vue/dist/vue.runtime.esm.js")
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@scss", resolve("src/assets/scss"))
      .set("@components", resolve("src/components"))
      .set("@plugins", resolve("src/plugins"))
      .set("@views", resolve("src/views"))
      .set("@router", resolve("src/router"))
      .set("@store", resolve("src/store"))
      .set("@layouts", resolve("src/layouts"))
      .set("@static", resolve("src/static"));


  },

  devServer: {
    proxy: {
      '/ajax': {
        target: 'http://localhost:8888', // 当有/ajax 开头的请求路径 就会转发到 target
        //   ws: true, //WebSocket 使用
        changeOrigin: true,
        pathRewrite: {
          '^/ajax': ''
        }
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  }

}
