import React from 'react'
import ReactDOM from 'react-dom'
// import BindEvent from '@/components/BindEvent.jsx'
import BindEvent from '@/components/BindInput.jsx'
//导入评论组件
// import CmtList from '@/components/CmtList2'
var a={
    name:'dahuang',
    // age:22
}
BindEvent.defaultProps={age:18}
// ReactDOM.render(<CmtList></CmtList>, document.getElementById('app')) ;
ReactDOM.render( <BindEvent {...a}> </BindEvent>, document.getElementById('app')) ;
