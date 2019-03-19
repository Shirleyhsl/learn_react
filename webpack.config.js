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
        }, ]
    },
    resolve:{
        extensions:['.js','jsx','json'],
        alias:{
            '@':path.join(__dirname,'./src'),
        }
    }
}