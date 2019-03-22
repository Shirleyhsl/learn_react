# 这是react的视频学习记录
* 视频来源1 bilibili 的黑马程序员课程 [最全的react技术视频教程](https://www.bilibili.com/video/av37668737/)
* 视频来源2 bilibili[尚硅谷React全家桶视频](https://www.bilibili.com/watchlater/#/av22504834)

1. `git clone https://github.com/Shirleyhsl/learn_react`
2. `npm install`
3. `npm run dev`

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
>什么是JSX语法：符合xml规范的JS语法（语法格式相对来说，要比HTML严谨很多）
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
5. 定义组件的默认值 `组件名.defaultProps={age:18}`
6. 对props中的属性值进行类型限制和必要性限制 
    * 引入prop-type的包 `cnpm i --save prop-type`
    * `组件名.propTypes={age:React.PropTypes.number.isRequired}`

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
### 两种创建组件方式的对比
>注意：使用class关键字创建的组件，有自己的私有数据和生命周期函数，但是使用function创建的组件，只有props,没有自己的私有数据和生命周期函数
1. 用构造函数创造出来的组件，叫做"无状态组件"
2. 用class关键字创建出来的组件叫做“有状态组件”
3. 什么情况下使用有状态组件？什么情况下使用无状态组件？
* 如果一个组件需要自己的私有属性就使用有状态组件，否则使用无状态组件
* 在class创建的组件中，state属性的数据是可读可写的。
> 有状态组件和无状态组件之间的区别就是：有无state属性
### 组件中的`state/data`和`props`之间的区别
* props中的数据都是外界传过来的；
* state/data中的数据都是组件私有的(通过Ajax获取回来的数据，一般都是私有数据)
* props中的数据都是只读的，不能重新赋值
* state/data中的数据，都是可读可写的。

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

## JSX中css样式格式
* 方式1：直接在jsx定义的div中设置
```html
  <div style={{color:'red'}}></div> 
```
* 方式2: 将样式对象和UI结构分离
```js
    import React from 'react'
    const itemStyle={border:'1px dashed #ccc',margin:'10px',padding:'10px',boxShadow:'0 0 10px #ccc'}
    const userStyle={fontSize:'14px'}
    const contentStyle={fontSize:'12px'}
    export default function CmtItem(props) {
    return <div style={itemStyle}>
                <h1 style={userStyle}>评论人:{props.user}</h1>
                <p style={contentStyle}>评论内容:{props.content}</p>
             </div>
}
```
* 方式3: 合并成一个大的样式对象
```js
    import React from 'react'
    const style = {
        item:{border:'1px dashed #ccc',margin:'10px',padding:'10px',boxShadow:'0 0 10px #ccc'},
        user:{fontSize:'14px'},
        content:{fontSize:'12px'}
    }
    export default function CmtItem(props) {
    return <div style={style.item}>
                <h1 style={style.user}>评论人:{props.user}</h1>
                <p style={style.content}>评论内容:{props.content}</p>
            </div>
    }
```
* 方式4: 抽离为单独的样式表模块
```js
    // style.js文件
    const style = {
        item:{border:'1px dashed #ccc',margin:'10px',padding:'10px',boxShadow:'0 0 10px #ccc'},
        user:{fontSize:'14px'},
        content:{fontSize:'12px'}
    }
    // CmtItem.jsx
    import React from 'react'
    import '../components/style.js'
    export default function CmtItem(props) {
    return <div style={style.item}>
                <h1 style={style.user}>评论人:{props.user}</h1>
                <p style={style.content}>评论内容:{props.content}</p>
            </div>
    }
```
* 方式5: 定义样式表
* 建style.css文件
* 导入css模块
    *  `cnpm i --save style-loader`
    *  `cnpm i --save css-loader`
* `webpack.config.js`中的`module`下配置规则
    ```js
    { //配置css loader
        test: /\.css$/,
        use: ['style-loader','css-loader']
    },
    ```
* 组件中导入该样式表,加入样式类名
```js
    import cssobj from '@/css/style.css'
    <h1 className='title'>这是评论列表组件</h1>
```
>注意：方式5通过导入css样式方式，css是全局生效的，不管其它组件都没有导入过这个组件

* 如何设置局部的css样式？
    * `webpack.config.js`中更改对.css文件的匹配规则，启动为模块化css文件
    ```js
        { //配置css loader
        //在css-loader后可以加参数，有个modules的参数表示为普通css文件启用模块化
            test: /\.css$/,
            use: ['style-loader','css-loader?modules']
        },
    ```
    * 将组件的导入css文件的语句改为
    `import style from '../components/style.js`
    * 使用style.类名/id名设置样式
    `<h1 className = {cssobj.title} > 这是评论列表组件 </h1>`
    >注意：只能为id和class设置局部作用域，标签选择器不可以设置
    * 改进 自定义生成的类名格式
        *  `{test: /\.css$/,use: ['style-loader','css-loader?modules&localIdentName[path][name]-[local]-[hash:$]']}`
        * [path] 表示样式表 `相对于项目根目录`所在路径
        * [name] 表示样式文件的名称
        * [local] 表示样式的类名定义名称
        * [hash:length] 表示32位的hash值

* 如何将某个局部的css样式改回全局的css样式(不被模块化)？
    ```css
    :global(.类名){
        font-style:italic;
    }
    ```
* 两个或以上的类名添加方式
    * `className={cssobj.title+' cssobj.tset'}`
    * `className={[cssobj.title,cssobj.test].join(' ')}`

## 处理第三方css样式(bootstrap为例)
* 安装 `cnpm i --save bootstarp@3.3.7`
* 导入 `import bootcss from 'bootstrap/dist/css/bootstrap.css`
* 配置字体loader及匹配规则
    * 安装 `cnpm i --save url-loader file-loader`
    ```js
    {
        test:/\.ttf|woff|woff2|eot|svg$/,
        use:'url-loader',
    }
    ```
* 通过 `className={bootcss.btn+' '+bootcss['btn-primary']`方式引入
* 想直接以`className='btn btn-primary'`导入怎么办？
    * 规定自己的文件只能是除css之外的格式，如scss，第三方文件以.css结尾
    * 根据这个规则安装scss模块，修改之前的匹配规则

## React中的绑定事件
1. 事件的名称是React提供的，因此名称的首字母必须大写`onclick`,`onMouseOver`
2. 为事件提供处理函数，必须是如下格式
```js
    onClick={function}
```
3. 用的最多的事件绑定形式为：
    ```html
    <button onClick={()=>this.show('传参')}">按钮</button>

    //事件的处理函数，需要定义为一个箭头函数，然后赋值给函数名称
    show = (arg1)=> {
        console.log('show方法'+arg1);
    }
    ```
4. 在React中，如果要修改state中的数据，推荐使用`this.setState({})`
>注意this.setState({})是异步的，如果想要执行完修改后再执行某些事件，需要写在第二参数（回调函数）中
5. 双向绑定
    * 在默认情况下，如果页面的表单元素绑定了state的状态值，那么，每当state中的数据发生变化时，数据就会自动同步到页面上，也就是表单的数据就会自动同步。
    * 如果表单元素发生了变化，想要把最新的值同步到state中，React中是没有这种同步机制的。在React中，需要程序员手动监听文本框的onChange事件，在onChange事件中拿到最新的文本框的值，手动同步到state中
    * 获取Dom元素的方式
        * 获取当前事件的元素 通过事件参数e来获取
        `onChange={(e)=>this.textChange(e)}`
        `textChange=(e)=>{this.setState({msg:e.target.value})}`
        * 获取页面任意元素 通过ref获取
         为页面元素绑定ref="***"
         通过`this.refs.***`来获取DOM元素
         >定义ref的时候报错了，没找到原因。没查出原因o(╥﹏╥)o

## 组件的生命周期
* 每个组件实例从创建、运行到销毁会发生一系列事件，这些事件就叫做组件的生命周期函数
* React组件的生命周期分为3个部分
    * 组件创建阶段：特点：一辈子只执行一次
        componentWillMount
        render
        componentDidMount
    * 组件运行阶段：按需、根据props属性或state状态的改变、有选择性的执行0至多次
        componentWillReceiveProps
        shouldComponentUpdate
        componentWillUpdate
        render
        componentDidUpdate
    * 组件销毁阶段：一辈子只执行一次
        componentWillUnmount
