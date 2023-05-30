import React, { Component } from 'react'
import {TbFileInvoice} from 'react-icons/tb'
import {RxPerson} from 'react-icons/rx'
import {AiOutlineHome} from 'react-icons/ai'
import {RiProductHuntLine} from 'react-icons/ri'
import {AiOutlineSetting} from 'react-icons/ai'
import {AiOutlineLogout} from 'react-icons/ai'

import { Helmet } from 'react-helmet';
export default class navbar extends Component {
  render() {
    return (
   <>
       
        
       
            <div className='menu'>
                <div className='logo'>
                <h2>CHELETE App</h2>
                </div>
                <a href="/acceuil"> <AiOutlineHome className='navbar_icon'/> Acceuil</a>
                <a href="/products"><RiProductHuntLine className='navbar_icon'/> Mon Stock</a>
                <a href="/clients"> <RxPerson className='navbar_icon'/> Mes Clients</a>
                <a href="/factures"> <TbFileInvoice className='navbar_icon'/> Mes Factures</a>
                <a href="/devis"> <TbFileInvoice className='navbar_icon'/> Mes Devis</a>
                <a href="/creditclient"> <TbFileInvoice className='navbar_icon'/> Fiche Crédit</a>
                <a href="/editadmin"><AiOutlineSetting className='navbar_icon'/> Mon Compte</a>
                <a href="/deconnexion"><AiOutlineLogout className='navbar_icon'/> Deconnexion</a>


            </div>

</>   
    )
  }
}
