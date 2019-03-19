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
const myh1 = React.createElement('h1', {
    id: 'myh1',
    title: 'this is a h1'
}, '这是h1');
/**
 * 使用ReactDOM把虚拟DOM渲染到页面
 * 参数1：要渲染的虚拟元素
 * 参数2：指定页面的一个容器,是一个DOM元素
 */
ReactDOM.render(myh1, document.getElementById('app'));