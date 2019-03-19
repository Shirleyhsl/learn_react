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