import React, { Component } from 'react'
import devisServices from '../../services/devisServices';
import Navbar from '../navbar'
import { Helmet } from 'react-helmet';
export default class addDevis extends Component {
  constructor(props) {
    super(props)
    this.state={
          date_devis:'',
          remarque:'',
          numero_devis:'',
          client: JSON.parse(sessionStorage.getItem("client"))
          
    }
    this.changeDateDevis=this.changeDateDevis.bind(this);
    this.changeRemarque=this.changeRemarque.bind(this);

    this.submitDevis=this.submitDevis.bind(this);

  
}
changeNdevis=(event)=>{
  this.setState({numero_devis : event.target.value})

}

 changeDateDevis=(event)=>{
    this.setState({date_devis : event.target.value})
 } 

changeRemarque=(event)=>{
  this.setState({remarque : event.target.value})
} 


 componentDidMount(){
  if(!sessionStorage.getItem('login')){
    this.props.history.push('/')
  }
  
  
}
 submitDevis=(e)=>{
    e.preventDefault();
    const jsonString = sessionStorage.getItem("client");
    const client = JSON.parse(jsonString);
    let devis ={
      date_devis:this.state.date_devis,
      client:client,
      numero_devis:this.state.numero_devis,
      remarque:this.state.remarque, 
    }

    
      devisServices.add(devis).then(res=>{
        console.log(JSON.stringify(devis))
         this.props.history.push(`/editDevis/${res.data.id_devis}`)
        })
         .catch((err) => {
            alert("Vérifier vos données ! ");
            this.props.history.push("/adddevis")
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
     <h2 className='titre'> Gérer les devis - Remplir les informations</h2>




     <div className='mytable' style={{marginTop:'5%'}}>
    <table className='table table-striped'>
     <tbody>
    <tr>
      <td> <label > N° Devis</label></td>
      <td> <input className='form-control' type="text"name="numero_devis" placeholder='N°DEVIS' onChange={this.changeNdevis}   /></td>
      <td>Client</td>
      <td><input className='form-control' type="text" name="client" placeholder='Client ' value={this.state.client.nom}/></td>
    </tr>
    <tr>
      <td>Date </td>
      <td><input className='form-control' type="date" name="date_devis" placeholder='Date ' onChange={this.changeDateDevis} /></td>
      <td>Remarque</td>
      <td><input className='form-control' type="text" name="remarque"  placeholder='Remarque' onChange={this.changeRemarque} /></td>
    </tr>

    </tbody>
</table>
</div>

          <div>
          <input className='imprimer_btn' type="submit"  value='SUIVANT' onClick={this.submitDevis}/>
          
          </div>
          </div>
        </div>


        
      </div>
    )
  }
}
