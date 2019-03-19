# 这是react的视频学习记录
* 视频来源 bilibili 的黑马程序员课程 [最全的react技术视频教程](https://www.bilibili.com/video/av37668737/)

## DAY1 基本配置
* 创建基本的webpack4.x环境
    * 使用`npm init`初始化
    * 在根目录下创建`src`，`index.js` `index.html`文件夹及文件
    * 安装webpack，运行`npm i webpack -g` ,  `npm i webpack --save`, `npm i webpack-cli --save`
    * 在webpack4.x中，提供了约定大于配置的概念，目的是为了尽量减少配置文件的体积：默认约定了
        * 打包的入口文件`src`->`index.js`
        * 打包的输出文件`dist`->`main.js`
        * 4.x中新增了`mode`选项，可选值为`development`、`production`
        * 因此就不需要配置打包入口文件。此时使用命令`webpack`就可以进行打包
    * 创建webpack.config.js
    ```js
    module.exports = {
        mode:'development'
    }
    ```
    * 安装`dev-server`,使项目可以自动打包更新， 运行`npm i webpack-dev-server --save`
        * 配置`package.json`:`dev":"webpack-dev-server --open --port 3000 --hot`
        * 打包生成的main.js在根目录下，但是托管在内存中，不在磁盘上
    * 将`index.html`放置到内存中(加快访问，减少对物理磁盘的访问，降低损坏)
        * 安装`html-webpack-plugin`,`npm i html-webpack-plugin --save`
        * 配置`webpack.config.js`的相关参数
        ```js
            const path = require('path')
            const HtmlWebPackPlugin = require('html-webpack-plugin');

            const htmlPlugin = new HtmlWebPackPlugin({
                template: path.join(__dirname,'./src/index.html'),   //源文件
                filename:'index.html'   //生成内存中的首页名称
            })
            module.exports = {
                mode:'development',
                plugins: [htmlPlugin]
            }
        ```
* 在项目中使用`react`
    * 安装`react`相关的安装包 运行`cnpm i react react-dom --save`
        * `react` 专门用于创建组件和虚拟DOM的，同时组件的生命周期都在这个包中
        * `react-dom` 专门进行DOM操作的，最主要的应用场景，就是`ReactDOM.render()`;

## react最基本的代码(创建虚拟节点-->渲染虚拟节点)
```js
//这两个导入的时候，接收成员的名字必须这么写
import React from 'react'
import ReactDOM from 'react-dom'

/**创建虚拟节点
 * 参数1： 创建的元素类型，字符串，表示元素的名称
 * 参数2：是一个对象或者null，表示这个DOM元素的属性
 * 参数3：子节点(包括其它虚拟DOM 获取文本子节点)
 * 参数n：其它子节点
 */
// const myh1= React.createElement('h1',null,'这是h1');
const myh1 = React.createElement('h1', {id:'myh1',title:'this is a h1'}, '这是h1');
/**
 * 使用ReactDOM把虚拟DOM渲染到页面
 * 参数1：要渲染的虚拟元素
 * 参数2：指定页面的一个容器,是一个DOM元素
 */
ReactDOM.render(myh1,document.getElementById('app'));
```

## JSX
>s什么是JSX语法：符合xml规范的JS语法（语法格式相对来说，要比HTML严谨很多）
1. 如何启动JSX语法?
    * 安装`babel`插件
        * 运行 `cnpm i babel-core babel-loader babel-plugin-transform-runtime --save`
        * 运行`cnpm i babel-preset-env babel-preset-stage-0 --save`
    * 安装能够识别转换jsx语法的包 `babel-preset-react`
        * 运行`cnpm i babel-preset-react --save`
    * 加`package.json`的`module.exports`中配置规则
    ```js
        module:{
            rules:[
                {test:'/\.js|jsx$/',use:'babel-loader',exclude:/node_modules/}
            ]
        }
    ```
    * 添加.babel配置文件
    ```js
    {
        "presets":["env","stage-0","react"],
        "plugins":["transform-runtime"]
    }
    ```

### 使用JSX语法的react基本写法
```js
/**
 * 创建虚拟节点
 * js不能写这种类似于heml的标记
 * 这种在js中混合写入类似于html的语法， 叫做JSX语法
 * jsx语法的本质还是运行的时候， 被转换成了React.CreatElement的方法执行
 */
const mydiv=<div id="mydiv" title="mydiv">这个一个div元素</div>
ReactDOM.render(mydiv, document.getElementById('app'));
```

## JSX基本语法
```js
import React from 'react'
import ReactDOM from 'react-dom'

let a=10
let str="你好"
let boo = false
let title="122"
const h1 = <h1>红红火火</h1>
const arrStr= ['龙猫', '小丸子', '花轮']
const nameArr=[]
arrStr.forEach(item => {
    const temp = <h5>{item}</h5>
    nameArr.push(temp)
});

ReactDOM.render(
    <div>
    {a+2}
    <hr/>
    {str}
    <hr />
    {boo?'真':'假'}
    <hr />
    <p title={title}>这是p标签</p>
    <h1/>
    {h1}
    <hr/>
    {nameArr},
    <hr/>
    {arrStr.map(item => {return <h5> {item} </h5>})}
    </div>, 
    document.getElementById('app')
    );
```
* 在jsx中写注释：`/* 这是注释 */`
* 为jsx中的元素添加class类名：需要使用`className`来代替`class`，`htmlFor`代替label中的`for`
* 在jsx创建DOM的时候,所有的节点，必须有唯一的根元素进行包裹；
* 在jsx语法中，标签必须成对出现，如果是单标签，则必须自闭和
>在编译引擎，在编译JSX代码的时候，如果遇到了`<`那么就把它当做HTML代码去编译，如果遇到了`{}`就把花括号内部的代码当做普通JS代码去编译。

## React中创建组件
* 第1种 创建组件的方式
>使用构造函数来创建组件，如果要接收外界传递的数据，需要再构造函数的参数列表中使用`props`来接收；必须要向外return一个合法的JSX创建的虚拟DOM
1. 父组件向子组件传递数据
2. 使用{...obj}属性扩展传递数据，可以将一个对象的所有的属性传过去
3. 将组件封装到单独的文件中
4. 注意：组件的名称首字母必须大写
```js
import React from 'react'
import ReactDOM from 'react-dom'
//第一种创建组件方法
function Hello(props) {
    return <div>这是一个Hello组件----{props.name}</div> 
}
const dog={ name:'大黄', age:3,}
/*直接将组件名称以标签的形式，丢到页面*/
//eactDOM.render(<Hello name={dog.name}></Hello>, document.getElementById('app')) ;
ReactDOM.render(<Hello {...dog}></Hello>, document.getElementById('app')) ;
```

* 第2种 创建组件的方式
>使用class关键字来创建组件
1. 基本的组件结构
```js
//在组件内部必须有render函数
class 组件名称 extends React.Component{
    //render函数渲染虚拟的DOM节点
    render(){
        return <div>这是class创建的组件</div>
    }
}
```
2. 完整的写法
```js
import React from 'react'
import ReactDOM from 'react-dom'

class Movie extends React.Component {
    render() {
        return <div> 这是class创建的组件--{this.props.name} ----{this.props.type}</div>
    }
}

const movie={
    name:'1988',
    type:'warm'
}

ReactDOM.render(<Movie {...movie}></Movie>, document.getElementById('app')) ;
```
## 两种创建组件方式的对比
>注意：使用class关键字创建的组件，有自己的私有数据和生命周期函数，但是使用function创建的组件，只有props,没有自己的私有数据和生命周期函数
1. 用构造函数创造出来的组件，叫做"无状态组件"
2. 用class关键字创建出来的组件叫做“有状态组件”
3. 什么情况下使用有状态组件？什么情况下使用无状态组件？
* 如果一个组件需要自己的私有属性就使用有状态组件，否则使用无状态组件
> 有状态组件和无状态组件之间的区别就是：有无state属性

## 抽离组件为单独的.jsx文件
* 创建Hello.jsx
```js
import React from 'react'
export default function Hello(props) {
    return <div>这是一个Hello组件----{props.name}</div> 
}
```
* 在index.js中导入
```js
import Hello from './components/Hello.jsx'
```

## 如何在导入组件时省略后缀名以及如何在导入时使用@表示某个路径
* 在webpack.config.js中可以配置参数
```js
resolve:{
    extensions:['.js','jsx','json'],
    alias:{
        '@':path.join(__dirname,'./src'),
     }
}

// 导入时
import Hello from '@/components/Hello'
```

