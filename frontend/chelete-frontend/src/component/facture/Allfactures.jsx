import React, { Component } from 'react'
import factureServices from '../../services/factureServices'
import {AiFillDelete,AiFillEdit } from 'react-icons/ai'
import{GrAdd} from 'react-icons/gr'
import{FiSearch} from 'react-icons/fi'
import Navbar from '../navbar'
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';

export default class AllFactures extends Component {

    constructor(props) {
        super(props)
        this.state={
              factures:[],
              Oldfactures:[],
              client:'',
              numero:''
        }
    this.addFacture=this.addFacture.bind(this)
     this.editFacture=this.editFacture.bind(this)
     this.search=this.search.bind(this)
     this.searchByNumero=this.searchByNumero.bind(this)

    }
//GET ALL    
componentDidMount(){
 
  if(!sessionStorage.getItem('login')){
    this.props.history.push('/')
  }
    factureServices.getAllFactures().then((res)=>{
        this.setState({factures:res.data})
        this.setState({Oldfactures:res.data})
    })  
}



 //ADD BUTTON
addFacture(){
    this.props.history.push('/factureclient')
}

  //EDIT BUTTON 
  editFacture(id){
    this.props.history.push(`/editfacture/${id}`)
} 


//SEARCH BOX BY N°

searchByNumero=(event)=>{
  this.setState({
    numero: event.target.value
  }, () => {
    if (this.state.numero === '') {
      this.setState({ factures: this.state.Oldfactures });
    } else {
      this.setState({
        factures: this.state.factures.filter(
          (facture) => facture.numero_facture.toLowerCase().includes(this.state.numero.toLowerCase())
        )
      });
    }
  });
}

//SEARCH BOX
search=(event)=>{
    this.setState({
        client: event.target.value
      }, () => {
        if (this.state.client === '') {
          this.setState({ factures: this.state.Oldfactures });
        } else {
          this.setState({
            factures: this.state.factures.filter(
              (facture) => facture.client.nom.toLowerCase().includes(this.state.client.toLowerCase())
            )
          });
        }
      });
     }  
     generatePdf(id){
      factureServices.generateFacture(id)

     }
  render() {
    return (
      <div>
         <Helmet>
        <title>facture</title>
      </Helmet>
      <div className='main'>
              <Navbar/> 
      <div className='body'>
        <h2 className='titre'> Gérer les factures</h2>



        <div className='search_barreF'>
        <button className='search_icon1'>
            <FiSearch />
            </button>
        <input style={{marginRight:'8%'}}  type="text" className='form-control' id='left-box' name='client' placeholder='CLIENT' onKeyUp={this.search}  />
        
        <input type="text" className='form-control' name='numero' id='right-box' placeholder='N°FACTURE' onKeyUp={this.searchByNumero}  />
            <button className='search_icon'>
            <FiSearch />
            </button>
        </div>

        <button className='add_btn' onClick={()=> this.addFacture()} > <GrAdd  style={{fontSize:25,Color:'#3C486B'}}/> Nouveau   </button>
      
        <div className='mytable'>
            <table className='table table-striped'>
                <thead>
                <tr>
                    <th>N° Facture</th>
                    <th>Date de Facture</th>
                    <th>Client</th>
                    <th>Montant</th>
                    <th>Mode de Reglement</th>
                    <th>Date de Reglement</th>
                    <th>N° BL</th>
                    <th>Situation</th>
                    <th>Remarque</th>


                </tr>
                </thead>
                <tbody>
                {this.state.factures.length === 0 ? (
                    <tr>
                    <td colSpan="9">Aucun facture disponible</td>
                    </tr>
                ) : (
                    this.state.factures.map((facture) => (
                    <tr key={facture.id_facture}>
                        <td>{facture.numero_facture}</td>
                         <td>{facture.date_facture}</td>
                        <td>{facture.client.nom}</td>
                        <td>{parseFloat(facture.montant).toFixed(2)}</td>
                        <td>{facture.mode_reglement}</td>
                        <td>{facture.date_reglement}</td>
                        <td>{facture.bl}</td>
                        <td>{facture.situation}</td>
                        <td>{facture.remarque}</td>
                        <td>
                       
                            <AiFillEdit onClick={() => this.editFacture(facture.id_facture)} style={{fontSize:21,Color:'#3C486B'}} />
      
                        </td>
                        <td>
                          <button onClick={()=>this.generatePdf(facture.id_facture)} >PDF</button>
                        </td>
                        
      </tr>
    ))
  )}
                </tbody>
            </table>


        </div>
      </div>
      </div> </div>
    )
  }
}
