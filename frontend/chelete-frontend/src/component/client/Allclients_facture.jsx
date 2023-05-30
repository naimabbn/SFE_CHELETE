import React, { Component } from 'react'
import clientServices from '../../services/clientServices'
import {AiFillDelete,AiFillEdit } from 'react-icons/ai'
import{GrAdd} from 'react-icons/gr'
import{FiSearch} from 'react-icons/fi'
import Navbar from '../navbar'
import { Helmet } from 'react-helmet';
export default class Allclients extends Component {

    constructor(props) {
        super(props)
        this.state={
              clients:[],
              Oldclients:[],
              client:'',
              isTrue:true,ice:'',client1:'',addresse:'',id_client:''
        }
    this.addclient=this.addclient.bind(this)
    this.DeleteClient=this.DeleteClient.bind(this);
    this.editClient=this.editClient.bind(this)
    this.editClient2=this.editClient2.bind(this)

    this.search=this.search.bind(this)
    this.redirectFa=this.redirectFa.bind(this)
    


    this.changeICE=this.changeICE.bind(this);
    this.changeClient1=this.changeClient1.bind(this);
    this.changeAddresse=this.changeAddresse.bind(this);

    }
//GET ALL    
componentDidMount(){
  if(!sessionStorage.getItem('login')){
    this.props.history.push('/')
  }
    clientServices.getAllclients().then((res)=>{
        this.setState({clients:res.data})
        this.setState({Oldclients:res.data})
    })  
}
changeICE=(event)=>{
  this.setState({ice : event.target.value})
} 
changeClient1=(event)=>{
  this.setState({client1 : event.target.value})
} 
changeAddresse=(event)=>{
  this.setState({addresse : event.target.value})
} 
//ADD BUTTON
addclient(){
  let Client ={ice:this.state.ice,nom:this.state.client1,addresse:this.state.addresse }
    clientServices.addClient(Client).then(res=>{
       alert('Client Ajouté  ')
       clientServices.getAllclients().then((res)=>{
        this.setState({clients:res.data})
        this.setState({Oldclients:res.data})
    })  
       this.setState({ice:'',client1:'',addresse:''})})
       .catch((err) => {
          alert("Vérifier vos données ! ");
          this.setState({ice:'',client1:'',addresse:''})
        });
}

//DELETE BUTTON
DeleteClient(id){
    if(window.confirm("Êtes-vous sûr de vouloir supprimer cet élément?")){
    clientServices.deleteClient(id).then((res)=>{
        this.setState({clients: this.state.clients.filter(client => client.id_client !== id)})
        
    })
    .catch((er)=>{
        alert('On ne peux pas supprimer cet élément')
    })
}
    }

  //EDIT BUTTON 
  editClient(id){
    clientServices.getClientById(id).then((res)=>{
      let client =res.data;
      this.setState({ice:client.ice,
          client1:client.nom,
          addresse:client.addresse,
          isTrue:false,
          id_client:id

      })
  })
} 
editClient2(){
  let Client ={ice:this.state.ice,nom:this.state.client1,addresse:this.state.addresse }
  if( window.confirm("Êtes-vous sûr de vouloir Modifier cet élément?")){
    clientServices.updateClient(Client,this.state.id_client).then(res=>{
      clientServices.getAllclients().then((res)=>{
        this.setState({clients:res.data})
        this.setState({Oldclients:res.data})
    })  
      this.setState({ice:'',client1:'',addresse:''}
      )})
       
    }
    else{
       alert('Modification annulée')
       this.setState({ice:'',client1:'',addresse:''})
       
    }
}

//SEARCH BOX
search=(event)=>{
    this.setState({
        client: event.target.value
      }, () => {
        if (this.state.client === '') {
          this.setState({ clients: this.state.Oldclients });
        } else {
          this.setState({
            clients: this.state.clients.filter(
              (client) => client.nom.toLowerCase().includes(this.state.client.toLowerCase())
            )
          });
        }
      });}


redirectFa(client){
  const Myclient = JSON.stringify(client);
    sessionStorage.setItem('client',Myclient);
    console.log(sessionStorage.getItem('client'))
    this.props.history.push('/addfacture')

}

getIcone(){
  if (this.state.isTrue){
    return <GrAdd style={{fontSize:25}}onClick={this.addclient}/>
  }
  else{
    return <AiFillEdit style={{fontSize:25}} onClick={()=> this.editClient2()}/>
  }
}


  render() {
    return (
      <div>
         <Helmet>
        <title>clients</title>
      </Helmet>
      <div className='main'>
              <Navbar/> 
      <div className='body'>
        <h2 className='titre'> Gérer les facture - sélectionner un client</h2>

            <div className='search_barre'>
            <input type="text" className='form-control' name='client' placeholder='Chercher par nom client'  onKeyUp={this.search}/>
            <button className='search_icon'>
            <FiSearch />
            </button>
            </div>

            <div className='mytable'>
            <table className='table table-striped'>
                <thead>
                <tr>
                    <th>ICE</th>
                    <th>Client</th>
                    <th>Addresse</th>
                    <th>Action</th>
                    <th>Facture</th>


                </tr>
                </thead>
                <tbody>
                <tr>
         
          
         <td><input type="text" className='form-control' name='ice' placeholder='ICE' value={this.state.ice} onChange={this.changeICE}/></td>
         <td> <input type="text" className='form-control' name='client' placeholder='CLIENT'value={this.state.client1} onChange={this.changeClient1}/></td>
         <td> <input type="text"className='form-control'  name='addresse' placeholder='ADDRESSE'value={this.state.addresse} onChange={this.changeAddresse}/></td>
         
         <td >{this.getIcone()}</td>
         <td></td>
         
       </tr>
                {this.state.clients.length === 0 ? (
                    <tr>
                    <td colSpan="6">Aucun client disponible</td>
                    </tr>
                ) : (
                    this.state.clients.map((client) => (
                    <tr key={client.id_client}>
                        <td>{client.ice}</td>
                        <td>{client.nom}</td>
                        <td>{client.addresse}</td>
                        <td>
                           <AiFillEdit style={{fontSize:21,marginRight: '5px',Color:'#3C486B'}} onClick={() => this.editClient(client.id_client)} />
                           <AiFillDelete style={{fontSize:21,Color:'#3C486B'}} onClick={() => this.DeleteClient(client.id_client)}/>
                        </td>
                        <td>      
                              <a onClick={() => this.redirectFa(client)} >  <GrAdd style={{color:'bleu'}}/></a>
                        </td>
                        
      </tr>
    ))
  )}
                </tbody>
            </table>


        </div>
      </div>
      </div></div>
    )
  }
}
