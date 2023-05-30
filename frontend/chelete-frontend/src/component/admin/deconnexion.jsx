import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

export default class deconnexion extends Component {
    constructor(props) {
        super(props)
        this.state={
             
        }}
    componentDidMount(){
        sessionStorage.removeItem('login')
        sessionStorage.removeItem('login')
        this.props.history.push('/')
    }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}
