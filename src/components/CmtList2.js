import React from 'react'
import CmtItem from '@/components/CmtItem2.jsx'
import cssobj from '@/css/cmtList.scss'
import 'bootstrap/dist/css/bootstrap.css'
export default class CmtList extends React.Component {
    constructor(){
        super()
        this.state={
            CommentList:[
                {id:1,user:'1号',content:'哈哈，哈密瓜'},
                {id:2,user:'2号',content:'哈哈，葡萄'},
                {id:3,user:'3号',content:'哈哈，西瓜'},
                {id:4,user:'4号',content:'哈哈，芒果'},
                {id:5,user:'5号',content:'哈哈，啦啦'},
            ]
        }
    }
    render() {
        return <div> 
         <h1 className = {cssobj.title} > 这是评论列表组件 </h1>
         <button className='btn btn-primary'>按钮</button>
         {this.state.CommentList.map(item=>
             <CmtItem {...item} key={item.id}></CmtItem>
         )}
        </div>
    }
}