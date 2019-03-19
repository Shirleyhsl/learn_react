import React from 'react'
import ReactDOM from 'react-dom'

let a=10
let str="你好"
let boo = false
let title="122"
const h1 = <h1>红红火火</h1>
// const arr = [
//     <h1>这是h1</h1>,
//     <h2>这是h2 </h2>
// ]
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