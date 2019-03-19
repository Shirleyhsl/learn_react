import React from 'react'
import ReactDOM from 'react-dom'
//第一种创建组件方法
//无论是vue还是react组件，props永远都是只读的，不能被重新赋值
function Hello(props) {
    return <div>这是一个Hello组件----{props.name}</div> 
}

const dog={
    name:'大黄',
    age:3,
    gender:'熊'
}
/**
 * 1.直接将组件名称以标签的形式，丢到页面
 */
ReactDOM.render(<Hello {...dog}></Hello>, document.getElementById('app')) ;