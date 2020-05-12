const path = require("path")
const webpack = require('webpack'); // 用于访问内置插件
var utils = require('./util')
const baseConfig = require('./webpack.config')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
function recursiveIssuer(m) {
    if (m.issuer) {
        return recursiveIssuer(m.issuer);
    } else if (m.name) {
        return m.name;
    } else {
        return false;
    }
}

const prodConfig = merge(baseConfig, {
    devtool: '#source-map',
    module: {
        rules: utils.styleLoaders({ sourceMap: true, usePostCSS: true, extract: true })
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:5].css',
            // chunkFilename: "assets/css/[name].[hash:5].css",
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                common: {
                    // name: "common",  // 指定公共模块 bundle 的名称
                    chunks: 'all',
                    minSize: 0, //大于0个字节,默认值30000，过小没有必要打包，优化不大
                    minChunks: 2, //抽离公共代码时，这个代码块最小被引用的次数
                    priority: -20,
                },
                // 第三方库抽离
                vendors: {
                    chunks: 'all',
                    priority: -10, //权重
                    test: /node_modules/
                },
                // 主要是针对多入口，会产生多分样式文件，合并成一个样式文件，减少加载次数 配置如下
                styles: {
                    name: 'styles',
                    test: /\.(scss|css|less)$/,
                    chunks: 'all',
                    minChunks: 1,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                // cssProcessorOptions: cssnanoOptions,
                cssProcessorPluginOptions: {
                    preset: ['default', {
                        discardComments: {
                            removeAll: true,
                        },
                        normalizeUnicode: false
                    }]
                },
                canPrint: true
            }),
        ],
    },
})
module.exports = prodConfig
