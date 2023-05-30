import React, { Component } from 'react'
import factureServices from '../../services/factureServices'
import clientServices from '../../services/clientServices'
import Navbar from '../navbar'
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';

export default class ficheCredit extends Component {

    constructor(props) {
        super(props)
        this.state={
            id:this.props.match.params.id,
              factures:[],
              client:''
              
        }


    }
//GET ALL    
componentDidMount(){
 
  if(!sessionStorage.getItem('login')){
    this.props.history.push('/')
  }
    factureServices.getFactureAccuser(this.state.id).then((res)=>{
        this.setState({factures:res.data})
        clientServices.getClientById(this.state.id).then((res)=>{
          let client =res.data;
          this.setState({
              client:client.nom
          })
      })
        ///////////////////////////
        
    })  
}

fichecredit(id){
    factureServices.fichecreditpdf(id);
    
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
     <h2 style={{marginTop:'4%'}} className='titre'> Fiche crédit - client : {this.state.client}</h2>
        

        <div className=''> 
            <button className='imprimer_btn'style={{marginTop:'4%'}} onClick={()=>this.fichecredit(this.state.id)}>Imprimer</button>
            </div>
        <div>
        
      
        <div className='mytable' style={{marginTop:'10%'}}>
            <table className='table table-striped'>
                <thead>
                <tr>
                    <th>N° Facture</th>
                    <th>Date de Facture</th>
                    <th>Client</th>
                    <th>Montant</th>
                    <th>Mode de Reglement</th>
                    <th>Date de Reglement</th>
                    <th>Situation</th>
                    <th>Remarque</th>


                </tr>
                </thead>
                <tbody>
                {this.state.factures.length === 0 ? (
                    <tr>
                    <td colSpan="8">Aucune facture accusée disponible pour ce client</td>
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
                        <td>{facture.situation}</td>
                        <td>{facture.remarque}</td>
                        
                        
      </tr>
    ))
  )}
                </tbody>
            </table>


        </div>
      </div>
      </div></div></div>
    )
  }
}
