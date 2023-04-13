// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
const path = require("path");
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  outputDir: "./build",
  devServer: {
    proxy: {
      "/api": {
        //配置代理以“/api”
        target: "http://codercba.com:5000", //目标主机
        ws: true, //代理的WebSockets
        changeOrigin: true, //需要虚拟主机站点
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        components: "@/components",
      },
    },
    plugins: [
      require("unplugin-auto-import/webpack")({
        imports: ["vue"],
        dts: "src/auto-import.d.ts",
        resolvers: [ElementPlusResolver()],
        /* options */
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     views: '@/views'
  //   }
  // },

  // chainWebpack: (config) => {
  //   config.resolve.alias.set('@', path.resolve(__dirname, 'src')).set('components', '@/components')
  // }
};
