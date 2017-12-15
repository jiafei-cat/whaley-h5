// 该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
// 静态资源存放目录
exports.assetsPath = function (_path) {
  var assetsSubDirectory = 'static'
  return path.posix.join(assetsSubDirectory, _path)
}

// 用于cssloader的配置
// sass-loader前提要装node-sass
// style-loader将所有的计算后的样式加入页面中
// vue-style-loader将所有的计算后的样式加入页面中
// css-loader使你能够使用类似@import和url(...)的方法实现require的功能
// sass-loader将vue内lang=scss的代码转为css
exports.cssLoaders = function (options) {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      // 是否压缩css
      minimize: false,
      // 是否生成map文件
      sourceMap: options.sourceMap
    }
  }
  /**
   * 根据参数生成css-loader的名字
   * @param {String} loader - loader名称
   * @param {Object} loaderOptions - loader参数
   */
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // 是否提取指定css
    if (options.extract) {
      return ExtractTextPlugin.extract({
        // 编译后用什么loader来提取css文件
        use: loaders,
        // 指需要什么样的loader去编译文件
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }
  return {
    // @param {Boolean} indentedSyntax - 缩进
    css: generateLoaders(),                                  // => ['vue-style-loader', {loader: 'css-loader', options: {}}]
    postcss: generateLoaders(),                              // => ['vue-style-loader', {loader: 'css-loader', options: {}}]
    less: generateLoaders('less'),                           // => ['vue-style-loader', {loader: 'css-loader', options: {}}, {loader: 'less-loader', options: {}}]
    sass: generateLoaders('sass', { indentedSyntax: true }), // => ['vue-style-loader', {loader: 'css-loader', options: {}},  {loader: 'sass-loader', options: { indentedSyntax: true }]
    scss: generateLoaders('sass'),                           // => ['vue-style-loader', {loader: 'css-loader', options: {}}, {loader: 'less-loader', options: {}}]
    stylus: generateLoaders('stylus'),                       // => ['vue-style-loader', {loader: 'css-loader', options: {}}, {loader: 'less-loader', options: {}}]
    styl: generateLoaders('stylus')                          // => ['vue-style-loader', {loader: 'css-loader', options: {}}, {loader: 'less-loader', options: {}}]
  }
}

// 根据vue文件使用的cssloader遍历加载到rules匹配css单独文件
//  result
//  output = [
//    test: /\.css$/,
//    use: ['vue-style-loader', {loader: 'css-loader', options: {}}]
//  ]
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'), // css => /\.css$/
      use: loader
    })
  }
  return output
}
