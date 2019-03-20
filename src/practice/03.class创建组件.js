import React from 'react'
import ReactDOM from 'react-dom'

class Movie extends React.Component {
    constructor(){
        super()
        this.state={
            msg:'我是class创建的movie组件'
        }
    }
    render() {
        return <div> 这是class创建的组件--{this.props.name} ----{this.props.type}<br/>{this.state.msg}</div>
    }
}

const movie={
    name:'1988',
    type:'warm'
}

ReactDOM.render(<Movie {...movie}></Movie>, document.getElementById('app')) ;