import React, { Component } from 'react'
import factureServices from '../../services/factureServices';
import Navbar from '../navbar'
import { Helmet } from 'react-helmet';
export default class addEditFacture extends Component {
  constructor(props) {
    super(props)
    this.state={
        services:[],
         id:this.props.match.params.id,
          numero_facture:'',
          date_facture:'',
          date_reglement:'',
          mode_reglement:'',
          situation:'',
          remarque:'',
          bl:'',
          client: JSON.parse(sessionStorage.getItem("client"))
          
    }
    this.changeNFcature=this.changeNFcature.bind(this);
    this.changeDateFacture=this.changeDateFacture.bind(this);
    this.changeDateReglement=this.changeDateReglement.bind(this);
    this.changeModeReglement=this.changeModeReglement.bind(this);
    this.changeSituation=this.changeSituation.bind(this);
    this.changeRemarque=this.changeRemarque.bind(this);
    this.changeBL=this.changeBL.bind(this)

    this.submitORUpdateFacture=this.submitORUpdateFacture.bind(this);

  
}

changeNFcature=(event)=>{
    this.setState({numero_facture : event.target.value})
 } 
 changeDateFacture=(event)=>{
    this.setState({date_facture : event.target.value})
 } 
 changeDateReglement=(event)=>{
    this.setState({date_reglement : event.target.value})
 } 
 changeModeReglement=(event)=>{
  this.setState({mode_reglement : event.target.value})
} 
changeSituation=(event)=>{
  this.setState({situation : event.target.value})
} 
changeRemarque=(event)=>{
  this.setState({remarque : event.target.value})
} 
changeBL=(event)=>{
  this.setState({bl : event.target.value})
}

 componentDidMount(){
  
  if(!sessionStorage.getItem('login')){
    this.props.history.push('/')
  }
  
}
 submitORUpdateFacture=(e)=>{
    e.preventDefault();
    const jsonString = sessionStorage.getItem("client");
    const client = JSON.parse(jsonString);
    let facture ={numero_facture:this.state.numero_facture,
      date_facture:this.state.date_facture,
      client:client,
      date_reglement:this.state.date_reglement,
      mode_reglement:this.state.mode_reglement,
      situation:this.state.situation,
      remarque:this.state.remarque, 
      bl:this.state.bl
    }
    console.log(JSON.stringify(facture))
    
      factureServices.addFacture(facture).then(res=>{
         this.props.history.push(`/editfacture/${res.data.id_facture}`)})
         .catch((err) => {
            alert("Vérifier vos données ! ");
            this.props.history.push("/addfacture")
          });
   }
   

  render() {
    return (

      
      <div>
      <Helmet>
     <title>factures</title>
   </Helmet>
   <div className='main'>
           <Navbar/> 
   <div className='body'>
     <h2 className='titre'> Gérer les factures - Remplir les informations</h2>




     <div className='mytable' style={{marginTop:'5%'}}>
    <table className='table table-striped'>
     <tbody>
    <tr>
      <td> <label > N°Facture</label></td>
      <td> <input className='form-control' type="text"name="numero_facture" placeholder='N°Facture' onChange={this.changeNFcature}   /></td>
      <td>Client</td>
      <td><input className='form-control' type="text" name="client" placeholder='Client ' value={this.state.client.nom}/></td>
    </tr>
    <tr>
      <td> <label >Date facture</label></td>
      <td><input className='form-control' type="date" name="date_facture" placeholder='Date ' onChange={this.changeDateFacture} /></td>
      <td>Date réglement</td>
      <td><input className='form-control' type="date" name=" date_reglement"  placeholder='Date Reglement' onChange={this.changeDateReglement}  /></td>
    </tr>
    <tr>
      <td>Mode de relement</td>
      <td>
           <select className="form-select" aria-label="Default select example" onChange={this.changeModeReglement}>
                <option value="">  </option>
                <option value="cheque">Chèque</option>
                <option value="effet">Effet</option>
                <option value="virement">Virement</option>
                <option value="espece">Espéce</option>
            </select>
      </td>
      <td>N° BL</td>
      <td><input className='form-control' type="text" name="bl"  placeholder='N° BL' onChange={this.changeBL} /></td>
    </tr>
    <tr>
      <td>Situation</td>
      <td><select className="form-select" aria-label="Default select example" onChange={this.changeSituation}>
                <option value="" > </option>
                <option value="valider">Validée</option>
                <option value="accuser">Accusée</option>
                <option value="regler">Réglée</option>
            </select></td>
      <td>Remarque</td>
      <td><input className='form-control' type="text" name="remarque"  placeholder='Remarque' onChange={this.changeRemarque} /></td>
    </tr>
  </tbody>
</table>
</div>


          <div>
          <input className='imprimer_btn' type="submit"  value='SUIVANT' onClick={this.submitORUpdateFacture}/>
          
          </div>
          </div>
          </div> 


        
      </div>
    )
  }
}
