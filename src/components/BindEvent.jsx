import React from 'react'
 export default class BindEvent extends React.Component{
    constructor(){
        super()
        this.state={
            msg:'state中的msg',
            age:22,
            name:'summer',
            gender:'女'
        }
    } 
    render(h) {
        return <div>
            BindEvent组件
            <hr/>
            <button onClick={()=>this.show('ヾ(◍°∇°◍)ﾉﾞ')}>按钮</button>
            <h3>{this.state.msg}</h3>
        </div> 
     }
     show=(arg)=>{
        this.setState({msg:'new'+arg})
     }
 }