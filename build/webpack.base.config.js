const path = require('path')
// 将当前目录下指定文件插入打包好的js,复制到输出目录
const htmlWebpackPlugin = require('html-webpack-plugin')
// vue-loader的options的配置
const vueLoaderConfig = require('./vue-loader.config')
const utils = require('./utils')

/**
 * 相对路径转绝对路径
 * @param {String} dir - 相对路径
 * @return {String} 绝对路径
 */
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
const config = {
  entry: {
    main: './src/main.js'
  },
  output: {
    // 输出文件名
    filename: '[name].js',
    // 输出目录路径
    path: resolve('dist'),
    // 公共路径 - 生成时会在所有资源地址前附加
    publicPath: ''
  },
  resolve: {
    // 引入文件时不需要加文件类型 import App from 'app.vue' => import App from 'app'
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // 为了兼容引入vue不一致问题
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
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
      }, {
        // 对图片资源文件使用url-loader
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 小于10K的图片转成base64编码的dataURL字符串写到代码中
          limit: 10000,
          // 其他的图片转移到静态资源文件夹
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        // 对多媒体资源文件使用url-loader
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 小于10K的资源转成base64编码的dataURL字符串写到代码中
          limit: 10000,
          // 其他的资源转移到静态资源文件夹
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
    ]
  }
  // 已经webpack.dev.config中配置
  // plugins: [
  //   new htmlWebpackPlugin({
  //     filename: 'index.html',
  //     template: 'index.html'
  //   })
  // ]
}

module.exports = config