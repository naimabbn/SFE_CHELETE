import React, { Component } from 'react'
import devisServices from '../../services/devisServices'
import {AiFillDelete,AiFillEdit } from 'react-icons/ai'
import{GrAdd} from 'react-icons/gr'
import{FiSearch} from 'react-icons/fi'
import Navbar from '../navbar'
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';

export default class AllDevis extends Component {

    constructor(props) {
        super(props)
        this.state={
              devis:[],
              OldDevis:[],
              client:'',
              numero:''
        }
    this.addDevis=this.addDevis.bind(this)
     this.editDevis=this.editDevis.bind(this)
     this.search=this.search.bind(this)

    }
//GET ALL    
componentDidMount(){
  if(!sessionStorage.getItem('login')){
    this.props.history.push('/')
  }
    devisServices.getAll().then((res)=>{
        this.setState({devis:res.data})
        this.setState({OldDevis:res.data})
    })  
}



 //ADD BUTTON
addDevis(){
    this.props.history.push('/devisclient')
}

  //EDIT BUTTON 
  editDevis(id){
    this.props.history.push(`/editdevis/${id}`)
} 
generatePdf(id){
  devisServices.generatedevis(id)

 }

//SEARCH BOX
search=(event)=>{
    this.setState({
        client: event.target.value
      }, () => {
        if (this.state.client === '') {
          this.setState({ devis: this.state.OldDevis });
        } else {
          this.setState({
            devis: this.state.devis.filter(
              (devis) => devis.client.nom.toLowerCase().includes(this.state.client.toLowerCase())
            )
          });
        }
      });
     }  

  render() {
    return (
      <div>
      <Helmet>
     <title>devis</title>
   </Helmet>
   <div className='main'>
           <Navbar/> 
   <div className='body'>
     <h2 className='titre'> Gérer les devis</h2>

     <div className='search_barre'>
            <input type="text" className='form-control' name='client' placeholder='Chercher par nom client'  onKeyUp={this.search}/>
            <button className='search_icon'>
            <FiSearch />
            </button>
            </div>

        

        <button className='add_btn'onClick={()=> this.addDevis()} > <GrAdd  style={{fontSize:25,Color:'#3C486B'}}/> Nouveau</button>
      
        <div className='mytable'>
            <table className='table table-striped'>
                <thead>
                <tr>
                    <th>Numéro </th>
                    <th>Date </th>
                    <th>Client</th>
                    <th>Montant</th>
                    <th>Remarque</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {this.state.devis.length === 0 ? (
                    <tr>
                    <td colSpan="5">Aucun Devis disponible</td>
                    </tr>
                ) : (
                    this.state.devis.map((devis) => (
                    <tr key={devis.id_devis}>
                      <td>{devis.numero_devis}</td>
                        <td>{devis.date_devis}</td>
                        <td>{devis.client.nom}</td>
                        <td>{parseFloat(devis.montant).toFixed(2)}</td>
                        <td>{devis.remarque}</td>
                        <td>
                        
                            <AiFillEdit style={{fontSize:21,Color:'#3C486B'}} onClick={() => this.editDevis(devis.id_devis)}/>
                        
                        
                        </td>
                        <td>
                        <button onClick={()=>this.generatePdf(devis.id_devis)} >PDF</button>
                        </td>
                        
      </tr>
    ))
  )}
                </tbody>
            </table>


        </div>
      </div>
      </div>
      </div>
    )
  }
}
