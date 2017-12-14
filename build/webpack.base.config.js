const path = require('path')
// 将当前目录下指定文件插入打包好的js,复制到输出目录
const htmlWebpackPlugin = require('html-webpack-plugin')
// vue-loader的options的配置
const vueLoaderConfig = require('./vueloader.config')

/**
 * 相对路径转绝对路径
 * @param {String} dir - 相对路径
 * @return {String} 绝对路径
 */
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const config = {
  entry: './src/main.js',
  output: {
    // 输出文件名
    filename: 'bundle-[hash].js',
    // 输出目录路径
    path: resolve('dist'),
    // 公共路径 - 生成时会在所有资源地址前附加
    publicPath: ''
  },
  resolve: {
    alias: {
      // 引入文件时不需要加文件类型 import App from 'app.vue' => import App from 'app'
      extensions: ['.js', '.vue', '.json'],
      // 为了兼容引入vue不一致问题
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        // sass核心 node-sass 必须安装
        // node-sass -> sass-loader -> vue-style-loader
        loader: 'vue-loader',
        options: vueLoaderConfig
      }, {
        test: /\.js$/,
        // babel核心 babel-core 必须安装
        // babel-core -> babel-loader
        loader: 'babel-loader',
        include: [resolve('src')]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    })
  ]
}

module.exports = config