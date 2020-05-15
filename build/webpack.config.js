const path = require("path")
const webpack = require('webpack'); // 用于访问内置插件
const DIST_PATH = path.resolve(__dirname, '../dist')
const SRC_PATH = path.resolve(__dirname, '../src')
const glob = require('glob')
const htmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')


const jsFiles = glob.sync(path.join(SRC_PATH, '/pages/*/index.js'))
const entryFiles = {}
jsFiles.forEach(file => {
  // var subkey = file.match(/src\/(\S*)\.js/)[1]
  var subkey = file.split('/').splice(-2, 1)
  entryFiles[subkey] = file
})
const htmlFiles = glob.sync(path.join(SRC_PATH, '/pages/*/*.html'))
//插件数组
let plugins = htmlFiles.map(file => {
  // var subkey = file.match(/src\/(\S*)\.js/)[1]
  var name = path.basename(file, '.html')
  return new htmlWebpackPlugin({
    filename: DIST_PATH + `/${name}.html`,
    title: name + '页面',
    // template: path.resolve(__dirname, '../public/index.html'),
    template: file,
    inject: true,    //打包后script标签位置 body（body底部） head（head里） true(默认值，html底部)
    hash: true,      //js文件是否添加hash字符串
    minify: false,    //html是否压缩
    chunks: [name, 'vendors', 'common'],
  })
})
console.log(process.env.NODE_ENV)

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const isDev = process.env.NODE_ENV === 'development'
module.exports = {
  //入口js文件
  // entry: path.resolve(__dirname, '../src/index.js'),   //方式一，单文件时
  // entry: [SRC_PATH + '/index.js', SRC_PATH + '/test.js'],      //方式二，多文件时
  // 对象形式
  // entry: {
  //     index: SRC_PATH + '/index.js',
  //     test: SRC_PATH + '/test.js'
  // },
  entry: entryFiles,
  // 编译输出配置
  output: {
    path: DIST_PATH,
    filename: `static/js/[name].[${isDev ? 'hash' : 'chunkhash:5'}].js`,   //[chunkhash:number] hash生成位数
    publicPath:'/'
  },
  // 插件
  plugins: [
    ...plugins,
    // 废弃使用，改用mini-css-extract-plugin
    // new ExtractTextPlugin({
    //     filename: 'style/[name].css',
    //     disable: false
    // }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ],
  // 模块解析
  module: {
    rules: [
      { test: /\.m?jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 打包图片文件时路径错误输出[object-module] ：http://localhost:3000/[object%20Module] 404 (Not Found) 
              //解决方法：关闭esModule，启用CommonJS模块语法
              esModule: false,
              limit: 10000,
              name: 'static/images/[name].[hash:7].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/images/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/images/[name].[hash:7].[ext]'
        }
      },
    ]
  },
  resolve: {
    //在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在
    extensions: ['.js', '.vue', '.json'],
    // Webpack 去哪些目录下寻找第三方模块，默认是只去node_modules目录下寻找。 有时你的项目里会有一些模块会大量被其它模块依赖和导入，由于其它模块的位置分布不定，针对不同的文件都要去计算被导入模块文件的相对路径， 这个路径有时候会很长，就像这样  import '../../../components/button'  这时你可以利用  modules  配置项优化，假如那些被大量导入的模块都在  ./src/components  目录下，把  modules  配置成
    modules: ['./src/components', 'node_modules'],
    //配置项通过别名来把原导入路径映射成一个新的导入路径。例如使用以下配置
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  }
};