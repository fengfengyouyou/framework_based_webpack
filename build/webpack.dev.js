const path = require("path")
const webpack = require('webpack'); // 用于访问内置插件
const DIST_PATH = path.resolve(__dirname, '../dist')
const SRC_PATH = path.resolve(__dirname, '../src')
const baseConfig = require('./webpack.config')
const utils = require('./util')
const merge = require('webpack-merge')
const portfinder = require('portfinder')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const devConfig = merge(baseConfig, {
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: utils.styleLoaders({ sourceMap: true, usePostCSS: true })
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        hot: true,                          //热更新
        open: true,                         //自动打开浏览器
        contentBase: DIST_PATH,             //服务器启动的根目录（html页面）
        port: '8081',                       //服务端口
        host: '0.0.0.0',                    //服务器地址
        historyApiFallback: true,            //404响应跳到index.html
        proxy: {
            '/api': 'http://localhost:3000'
        },
        inline: true,
        useLocalIp: true,
        quiet: true, // necessary for FriendlyErrorsPlugin
    }
})
module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || devConfig.devServer.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
            // add port to devServer config
            devConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            devConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`项目运行端口号: http://${devConfig.devServer.host}:${port}`],
                },
                onErrors: function (severity, errors) {
                    console.log(errors)
                }
            }))

            resolve(devConfig)
        }
    })
})