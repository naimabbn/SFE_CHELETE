import React, { Component } from 'react'
import factureServices from '../../services/factureServices';
import {AiFillDelete, AiFillEdit } from 'react-icons/ai'
import Navbar from '../navbar'
import{GrAdd} from 'react-icons/gr'
import { Helmet } from 'react-helmet';
export default class addEditFacture extends Component {
  constructor(props) {
    super(props)
    this.totalRef = React.createRef();
    this.totalTVA = React.createRef();
    this.totalLettre = React.createRef();
    this.state={

        services:[],
        id_service:0,
        designation:'',
        sMontant:0.00,
        prix_unitaire:'0.00',
        qte:'',
        facture:[],
         id:this.props.match.params.id,
          numero_facture:'',
          date_facture:'',
          montant:0.0,
          date_reglement:'',
          mode_reglement:'',
          situation:'',
          remarque:'',
          bl:'',
          client: [],
          total_lettre:''
          
    }
    this.changeNFcature=this.changeNFcature.bind(this);
    this.changeDateFacture=this.changeDateFacture.bind(this);
    this.changeDateReglement=this.changeDateReglement.bind(this);
    this.changeModeReglement=this.changeModeReglement.bind(this);
    this.changeSituation=this.changeSituation.bind(this);
    this.changeRemarque=this.changeRemarque.bind(this);
    this.changeBL=this.changeBL.bind(this)
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
changeDesignation=(event)=>{
    this.setState({designation : event.target.value})
    
  }
changePU=(event)=>{
    this.setState({prix_unitaire : event.target.value})
  }
changeQuantite=(event)=>{
    this.setState({qte : event.target.value})

}
changelettre=(event)=>{
  this.setState({montant_lettre : event.target.value})
  console.log(this.state.montant_lettre)

}
componentDidUpdate(){
  factureServices.getServicesByIdFacture(this.state.id).then((res)=>{
    this.setState({services:res.data})
    let montantTotal = 0;
      res.data.forEach((service) => {
        montantTotal += service.montant;
      });
      let m=montantTotal*1.2
      this.setState({ montant:m });
      this.setState({montant_lettre:this.numberToWord(this.totalTVA.current.value)})
})
}
 componentDidMount(){
  if(!sessionStorage.getItem('login')){
    this.props.history.push('/')
  }
   factureServices.getFactureById(this.state.id).then((res)=>{
    this.setState({facture:res.data})
    
        let facture =res.data;
        this.setState({numero_facture:facture.numero_facture,
                      date_facture:facture.date_facture,
                      date_reglement:facture.date_reglement,
                      mode_reglement:facture.mode_reglement,
                      situation:facture.situation,
                      remarque:facture.remarque,
                      bl:facture.bl,
                      client:facture.client,
                      isTrue:true

        })
        
    })
   
    factureServices.getServicesByIdFacture(this.state.id).then((res)=>{
        this.setState({services:res.data})
     
    })
       
    
  }
  

 submitORUpdateFacture=(e)=>{
    e.preventDefault();
    const jsonString = sessionStorage.getItem("client");
    const client = JSON.parse(jsonString);
    // const totalAmount = Math.floor(this.totalTVA.current.value);
    // const mt = convertNumberToFrenchWords(totalAmount)
    //console.log(mt)
    let facture ={numero_facture:this.state.numero_facture,
      date_facture:this.state.date_facture,
      client:client,
      montant:this.totalTVA.current.value,
      montant_lettre:this.numberToWord(this.totalTVA.current.value),
      date_reglement:this.state.date_reglement,
      mode_reglement:this.state.mode_reglement,
      situation:this.state.situation,
      bl:this.state.bl,
      remarque:this.state.remarque, 
    }
    console.log(JSON.stringify(facture))
   
   
      
      factureServices.updateFacture(facture,this.state.id).then(res=>{
        alert('Facture ajoutée')
         this.props.history.push("/factures")})

 }
addService(){
    let service={designation:this.state.designation,
      pu: parseFloat(this.state.prix_unitaire).toFixed(2).toString(),
    quantite:this.state.qte,
    montant:parseFloat(this.totalRef.current.value).toFixed(2),
    facture:this.state.facture 
    }
    factureServices.addService(service).then(()=>{
        this.setState({designation:'',prix_unitaire:'',qte:''})
        alert('Element Ajouté  ')
        
        })
        .catch((err) => {
           alert("Vérifier vos données ! ");
           
         }); 
}

editService1(id){
  
  factureServices.getServiceById(id).then((res)=>{
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
    factureServices.updateService(service,this.state.id_service).then(res=>{
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
    factureServices.deleteService(id).then(()=>{
        alert('élément supprimé')
    })
    .catch((er)=>{
        alert('On ne peux pas supprimer cet élément')
    })
}
}

getIcone(){
  if (this.state.isTrue){
    return <GrAdd style={{fontSize:25}} onClick={this.addService}/>
  }
  else{
    return <AiFillEdit style={{fontSize:25}} onClick={()=> this.editService2(this.state.id_service)}/>
  }
}
      numberToWord(nombre){
      var partieEntiere = Math.floor(nombre);
      var partieDecimale = (nombre % 1).toFixed(2)*100
      if(partieDecimale != 0){
      return convertNumberToFrenchWords(partieEntiere)+" dh et "+convertNumberToFrenchWords(partieDecimale)+" centimes"}
      else{
        return (convertNumberToFrenchWords(partieEntiere))}
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
     <h2 className='titre'> Gérer les factures - Ajouter les services</h2>




     <div className='mytable' style={{}}>
    <table className='table table-striped'>
     <tbody>
    <tr>
      <td> <label > N°Facture</label></td>
      <td><input className='form-control' type="text"name="numero_facture" placeholder='Numero Facture' onChange={this.changeNFcature}   value={this.state.numero_facture}/></td>
      <td>Client</td>
      <td><input className='form-control' type="text" name="client" placeholder='Client ' value={this.state.client.nom}/></td>
    </tr>
    <tr>
      <td> <label >Date facture</label></td>
      <td><input className='form-control' type="date" name="date_facture" placeholder='Date ' value={this.state.date_facture} onChange={this.changeDateFacture} /></td>
      <td>Date réglement</td>
      <td><input className='form-control' type="date" name=" date_reglement"  placeholder='Date Reglement' onChange={this.changeDateReglement} value={this.state.date_reglement} /></td>
    </tr>
    <tr>
      <td>Mode de relement</td>
      <td>
           <select className="form-select" aria-label="Default select example" onChange={this.changeModeReglement}>
                <option value=""> {this.state.mode_reglement.toUpperCase()} </option>
                <option value="cheque">Chèque</option>
                <option value="effet">Effet</option>
                <option value="virement">Virement</option>
                <option value="espece">Espéce</option>
            </select>
      </td>
      <td>N° BL</td>
      <td><input className='form-control' type="text" name="bl"  placeholder='N° BL' onChange={this.changeBL} value={this.state.bl}/></td>
    </tr>
    <tr>
      <td>Situation</td>
      <td><select className="form-select" aria-label="Default select example" onChange={this.changeSituation}>
                <option value="" >{this.state.situation.toUpperCase()} </option>
                <option value="valider">Validée</option>
                <option value="accuser">Accusée</option>
                <option value="regler">Réglée</option>
            </select></td>
      <td>Remarque</td>
      <td><input className='form-control' type="text" name="remarque"  placeholder='Remarque' onChange={this.changeRemarque} value={this.state.remarque}/></td>
    </tr>
    <tr>
      <td> Total TCC</td>
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
            <th>Action</th>

            </tr>
            </thead>
          <tbody>
        <tr>
          <td style={{width:'60%'}}><input type="text" name="designation"  className='form-control' placeholder='DESIGNATION' onChange={this.changeDesignation} value={this.state.designation} /></td>
          <td><input type="text" name="quantite" className='form-control' placeholder='QUANTITE' onChange={this.changeQuantite}  value={this.state.qte} /></td>
          <td><input type="text" name="pu" className='form-control' placeholder='PRIX UNITAIRE' onChange={this.changePU} value={this.state.prix_unitaire} /></td>
          <td><input type="text" name="" className='form-control'ref={this.totalRef} value={parseInt(this.state.qte)* this.state.prix_unitaire}  /></td>
          <td>{this.getIcone()}</td>

        </tr>
        
            {this.state.services.map((service)=>(
                
                <tr key={service.id_service}>
                <td>{service.designation} </td>
                <td>{service.quantite}</td>
                <td>{parseFloat(service.pu).toFixed(2)} </td>
                <td>{parseFloat(parseFloat(service.pu) * parseInt(service.quantite)).toFixed(2)} </td>
                <td>
                    <div><AiFillEdit style={{fontSize:21,marginRight: '3px',Color:'#3C486B'}}onClick={()=> this.editService1(service.id_service)}/></div>
                    <div><AiFillDelete style={{fontSize:21,Color:'#3C486B'}} onClick={()=>this.deleteService(service.id_service)}/></div>      
                            
                        
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