const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    template: path.join(__dirname, './src/index.html'), //源文件
    filename: 'index.html' //生成内存中的首页名称
})
module.exports = {
    mode: 'development',
    plugins: [htmlPlugin],

    module: {
        rules: [{ //配置babel转换ES6高级语法
                test: /\.js|jsx$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
             { //配置css loader
                 //在css-loader后可以加参数，有个modules的参数表示为普通css文件启用模块化
                 test: /\.css$/,
                 use: ['style-loader', 'css-loader']
             },
            { //配置css loader
                //在css-loader后可以加参数，有个modules的参数表示为普通css文件启用模块化
                test: /\.scss$/,
                use: ['style-loader','css-loader?modules','sass-loader']
            },
            {
                //处理字体文件
                test:/\.ttf|woff|woff2|eot|svg$/,
                use:'url-loader',
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': path.join(__dirname, './src'),
        }
    }
}