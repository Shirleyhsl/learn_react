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
             <input type="text" style={{width:'100%'}} value={this.state.msg} 
             onChange={(e)=>this.textChange(e)} />
        </div> 
     }
     show=(arg)=>{
        this.setState({msg:'new'+arg})
     }
     textChange=(e)=>{
         //获取文本框值的方法1，通过事件参数e来获取
          this.setState({msg:e.target.value})
        //获取文本框值的方法2，使用ref
        // console.log(this.refs.inputText);
        // //   this.setState({msg:this.refs.txt.value})
     }
 }