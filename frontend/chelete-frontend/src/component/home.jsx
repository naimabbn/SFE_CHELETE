import React, { Component } from 'react'
import Navbar from './navbar'
import { Helmet } from 'react-helmet';
export default class home extends Component {
  render() {
    return (
      <div>
        <Helmet>
        <title>Acceuil</title>
      </Helmet>

      <div className='main'>
              <Navbar/> 
          
                <div className='home_container'>
                <div className='contenu'>
                <h1>Votre espace de gestion</h1>
                <h2>Chelete App</h2>
                </div>
                </div>
            </div>
      </div>
     
    )
  }
}
