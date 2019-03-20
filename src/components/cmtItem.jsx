import React from 'react'

//第一层封装 将样式对象和UI结构分离
// const itemStyle={border:'1px dashed #ccc',margin:'10px',padding:'10px',boxShadow:'0 0 10px #ccc'}
// const userStyle={fontSize:'14px'}
// const contentStyle={fontSize:'12px'}
// 第二次封装 合并成一个大的样式对象
// const style = {
//      item:{border:'1px dashed #ccc',margin:'10px',padding:'10px',boxShadow:'0 0 10px #ccc'},
//      user:{fontSize:'14px'},
//      content:{fontSize:'12px'}
// }
// 第三次封装 抽离为单独的样式表模块
import style from '../components/style.js'
//使用function构造函数，定义普通无状态组件
export default function CmtItem(props) {
    return <div style={style.item}>
                <h1 style={style.user}>评论人:{props.user}</h1>
                <p style={style.content}>评论内容:{props.content}</p>
             </div>
}