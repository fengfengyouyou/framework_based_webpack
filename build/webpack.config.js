const path = require("path")
const webpack = require('webpack'); // 用于访问内置插件
const DIST_PATH = path.resolve(__dirname, '../dist')
const SRC_PATH = path.resolve(__dirname, '../src')
const glob = require('glob')
const htmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const jsFiles = glob.sync(path.join(SRC_PATH, '/**/*.js'))
const entryFiles = {}
jsFiles.forEach(file => {
    // var subkey = file.match(/src\/(\S*)\.js/)[1]
    var subkey = path.basename(file, '.js')
    entryFiles[subkey] = file
})
const htmlFiles = glob.sync(path.join(SRC_PATH, '/pages/**/*.html'))
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
        chunks: [name, 'vender'],
    })
})
console.log(process.env.NODE_ENV)
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
        filename: `static/js/[name].[${isDev ? 'hash' : 'chunkhash:5'}].js`   //[chunkhash:number] hash生成位数
    },
    // 插件
    plugins: [
        ...plugins,
        // 废弃使用，改用mini-css-extract-plugin
        // new ExtractTextPlugin({
        //     filename: 'style/[name].css',
        //     disable: false
        // }),
        new CleanWebpackPlugin()
    ],
    // 模块解析
    module: {
        rules: [
            { test: /\.m?js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
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
    }
};