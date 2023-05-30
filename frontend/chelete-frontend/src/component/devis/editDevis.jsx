import React, { Component } from 'react'
import devisServices from '../../services/devisServices';
import {AiFillDelete, AiFillEdit } from 'react-icons/ai'
import Navbar from '../navbar'
import{GrAdd} from 'react-icons/gr'
import { Helmet } from 'react-helmet';
export default class editDevis extends Component {
  constructor(props) {
    super(props)
    this.totalRef = React.createRef();
    this.totalTVA = React.createRef();
    this.state={

        services:[],
        id_service:0,
        designation:'',
        sMontant:0.00,
        prix_unitaire:'0.00',
        qte:'',
        client:[],
        devis:[],
         id:this.props.match.params.id,
         date_devis:'',
         remarque:'',
         numero_devis:'',
          montant:0.0,
          
    }
    this.changeNdevis=this.changeNdevis.bind(this)
    this.changeDateDevis=this.changeDateDevis.bind(this);
    this.changeRemarque=this.changeRemarque.bind(this);
    this.submitORUpdateFacture=this.submitORUpdateFacture.bind(this);
    this.changeDesignation=this.changeDesignation.bind(this)
    this.changePU=this.changePU.bind(this)
    this.changeQuantite=this.changeQuantite.bind(this)
    this.addService=this.addService.bind(this)
    this.editService1=this.editService1.bind(this)
    this.editService2=this.editService2.bind(this)
    this.deleteService=this.deleteService.bind(this)
    this.getIcone=this.getIcone.bind(this)
    
  
}


 changeDateDevis=(event)=>{
    this.setState({date_devis : event.target.value})
 } 
 changeNdevis=(event)=>{
  this.setState({numero_devis : event.target.value})
 }
changeRemarque=(event)=>{
  this.setState({remarque : event.target.value})
} 
changeDesignation=(event)=>{
    this.setState({designation : event.target.value})
    
  }
changePU=(event)=>{
    this.setState({prix_unitaire : event.target.value})
  }
changeQuantite=(event)=>{
    this.setState({qte : event.target.value})
}


componentDidUpdate(){
  devisServices.getServicesByIdFacture(this.state.id).then((res)=>{
    this.setState({services:res.data})
    let montantTotal = 0;
      res.data.forEach((service) => {
        montantTotal += service.montant;
      });
      let m=montantTotal*1.2
      this.setState({ montant:m });
})
}
 componentDidMount(){

  if(!sessionStorage.getItem('login')){
    this.props.history.push('/')
  }
   devisServices.getById(this.state.id).then((res)=>{
    this.setState({devis:res.data})
    
        let devis =res.data;
        console.log(JSON.stringify(devis))
        this.setState({
                      numero_devis:devis.numero_devis,
                      date_devis:devis.date_devis,
                      remarque:devis.remarque,
                      client:devis.client,
                      isTrue:true

        })
        
    })
   
    devisServices.getServicesByIdFacture(this.state.id).then((res)=>{
        this.setState({services:res.data})
     
    })
       
    
  }
  
  numberToWord(nombre){
    var partieEntiere = Math.floor(nombre);
    var partieDecimale = (nombre % 1).toFixed(2)*100




    if(partieDecimale != 0){
    return convertNumberToFrenchWords(partieEntiere)+" dh et "+convertNumberToFrenchWords(partieDecimale)+" centimes"}
    else{
      return (convertNumberToFrenchWords(partieEntiere))}
    }
 submitORUpdateFacture=(e)=>{
    e.preventDefault();
    const jsonString = sessionStorage.getItem("client");
    const client = JSON.parse(jsonString);
    let devis ={
      date_devis:this.state.date_devis,
      client:client,
      montant:this.totalTVA.current.value,
      montant_lettre:this.numberToWord(this.totalTVA.current.value),
      remarque:this.state.remarque, 
      numero_devis:this.state.numero_devis
    }
    console.log(JSON.stringify(devis))
   
   
      
      devisServices.update(devis,this.state.id).then(res=>{
        
         this.props.history.push("/devis")})
         
     
 }
addService(){
    let service={designation:this.state.designation,
      pu: parseFloat(this.state.prix_unitaire).toFixed(2).toString(),
    quantite:this.state.qte,
    montant:parseFloat(this.totalRef.current.value).toFixed(2),
    devis:this.state.devis ,
    u:'U'
    }
    devisServices.addService(service).then(()=>{
        this.setState({designation:'',prix_unitaire:'',qte:''})
        alert('Element Ajouté  ')
        
        })
        .catch((err) => {
           alert("Vérifier vos données ! ");
           
         }); 
}

editService1(id){
  
    devisServices.getServiceById(id).then((res)=>{
     this.setState({id_service:res.data.id_service,designation:res.data.designation,prix_unitaire:res.data.pu,qte:res.data.quantite})
     this.setState({isTrue:false})
  })
}
editService2(id){
  let service ={designation:this.state.designation,
    pu:this.state.prix_unitaire,
    quantite:this.state.qte,
    montant:this.state.montant, 
  }
    if( window.confirm("Êtes-vous sûr de vouloir Modifier cet élément?")){
        devisServices.updateService(service,this.state.id_service).then(res=>{
      this.setState({designation:'',prix_unitaire:'',qte:''})
      this.setState({isTrue:true})
      alert('Elément modifiée')
      })
    }
    else{
       alert('Modification annulée')
       
       
    }
}
deleteService(id){
  if(window.confirm("Êtes-vous sûr de vouloir supprimer cet élément?")){
    devisServices.deleteService(id).then(()=>{
        alert('Produit supprimé')
    })
    .catch((er)=>{
        alert('On ne peux pas supprimer cet élément')
    })
}
}

getIcone(){
  if (this.state.isTrue){
    return <GrAdd style={{color:'bleu'}} onClick={this.addService}/>
  }
  else{
    return <AiFillEdit onClick={()=> this.editService2(this.state.id_service)}/>
  }
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
     <h2 className='titre'> Gérer les devis - Ajouter les services</h2>




     <div className='mytable' style={{}}>
    <table className='table table-striped'>
     <tbody>
     <tr>
      <td> <label > N° Devis</label></td>
      <td> <input className='form-control' type="text"name="numero_devis" placeholder='N°DEVIS' onChange={this.changeNdevis} value={this.state.numero_devis}  /></td>
      <td>Client</td>
      <td><input className='form-control' type="text" name="client" placeholder='Client ' value={this.state.client.nom}/></td>
    </tr>
    <tr>
      <td>Date </td>
      <td><input className='form-control' type="date" name="date_devis" placeholder='Date ' onChange={this.changeDateDevis} value={this.state.date_devis} /></td>
      <td>Remarque</td>
      <td><input className='form-control' type="text" name="remarque"  placeholder='Remarque' onChange={this.changeRemarque} value={this.state.remarque}/></td>
    </tr>
    <tr>
      <td>Montant TCC</td>
      <td colSpan={3}><input className='form-control' type="text" name=" montant"  placeholder='Montant' ref={this.totalTVA} value={parseFloat(this.state.montant).toFixed(2)} /></td>
    </tr>

    </tbody>
</table>
</div>
          <div>
          <input  type="submit" className='imprimer_btn' value='VALIDER' onClick={this.submitORUpdateFacture}/>
          </div>
        
        <div className='mytable'>
          <table className='table table-striped'>
              <thead>
              <tr>
        
            <th> Disignation</th>
            <th>Quantite</th>
            <th>Prix Unitaire</th>
            <th>Montant</th>
            </tr>
            </thead>
          <tbody>
        <tr>
          <td style={{width:'60%'}}><input type="text" className='form-control' name="designation" placeholder='DESIGNATION' onChange={this.changeDesignation} value={this.state.designation} /></td>
          <td><input type="text" className='form-control' name="quantite" placeholder='QUANTITE' onChange={this.changeQuantite}  value={this.state.qte} /></td>
          <td><input type="text"  className='form-control' name="pu" placeholder='PRIX UNITAIRE' onChange={this.changePU} value={this.state.prix_unitaire} /></td>
          <td><input type="text" name="" className='form-control' ref={this.totalRef} value={parseInt(this.state.qte)* this.state.prix_unitaire}  /></td>
          <td>{this.getIcone()}</td>

        </tr>
        
            {this.state.services.map((service)=>(
                
                <tr key={service.id_service}>
                <td>{service.designation} </td>
                <td>{service.quantite}</td>
                <td>{parseFloat(service.pu).toFixed(2)} </td>
                <td>{parseFloat(parseFloat(service.pu) * parseInt(service.quantite)).toFixed(2)} </td>
                <td>
                    <div><AiFillEdit onClick={()=> this.editService1(service.id_service)}/></div>
                    <div><AiFillDelete onClick={()=>this.deleteService(service.id_service)}/></div>      
                            
                        
                        </td>
                </tr> 
                
            ))}
       
        
        </tbody>
        </table>
        </div>
        </div>
        </div>
      </div>
    )
  }}
  function convertNumberToFrenchWords(number) {
    const units = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
    const tens = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'];
    const specialNumbers = {
      70: 'soixante-dix',
      71: 'soixante et onze',
      72: 'soixante-douze',
      73: 'soixante-treize',
      74: 'soixante-quatorze',
      75: 'soixante-quinze',
      76: 'soixante-seize',
      77: 'soixante-dix-sept',
      78: 'soixante-dix-huit',
      79: 'soixante-dix-neuf',
      90: 'quatre-vingt-dix',
      91: 'quatre-vingt-onze',
      92: 'quatre-vingt-douze',
      93: 'quatre-vingt-treize',
      94: 'quatre-vingt-quatorze',
      95: 'quatre-vingt-quinze',
      96: 'quatre-vingt-seize',
      97: 'quatre-vingt-dix-sept',
      98: 'quatre-vingt-dix-huit',
      99: 'quatre-vingt-dix-neuf'
    };
  
    let words = '';
    let remainder = 0;
  
    if (number === 0) {
      return 'zéro';
    }
  
    if (number < 0 || number >= 1000000000000) {
      return 'nombre non pris en charge';
    }
  
    // handle billions
    if (Math.floor(number / 1000000000) > 0) {
      words += convertNumberToFrenchWords(Math.floor(number / 1000000000)) + ' milliard ';
      number %= 1000000000;
    }
  
    // handle millions
    if (Math.floor(number / 1000000) > 0) {
      words += convertNumberToFrenchWords(Math.floor(number / 1000000)) + ' million ';
      number %= 1000000;
    }
  
    // handle thousands
    if (Math.floor(number / 1000) > 0) {
      words += convertNumberToFrenchWords(Math.floor(number / 1000)) + ' mille ';
      number %= 1000;
    }
  
    // handle hundreds
    if (Math.floor(number / 100) > 0) {
      words += convertNumberToFrenchWords(Math.floor(number / 100)) + ' cent ';
      number %= 100;
    }
  
    // handle tens
    if (Math.floor(number / 10) > 1) {
      if (number >= 70 && number <= 79) {
        words += specialNumbers[number] + ' ';
      } else if (number >= 90 && number <= 99) {
        words += specialNumbers[number] + ' ';
      } else {
        words += tens[Math.floor(number / 10)] + '-';
        remainder = number % 10;
      }
    } else {
      remainder = number;
    }
  
    // handle units
    if (remainder > 0) {
      words += units[remainder];
    }
  
    return words.trim();
  }