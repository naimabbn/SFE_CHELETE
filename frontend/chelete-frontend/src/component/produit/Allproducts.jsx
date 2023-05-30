import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import produitServices from '../../services/produitServices'
import {AiFillDelete,AiFillEdit } from 'react-icons/ai'
import{GrAdd} from 'react-icons/gr'
import{FiSearch} from 'react-icons/fi'
import Navbar from '../navbar'
import { Helmet } from 'react-helmet';
export default class Allproducts extends Component {
    constructor(props){
        super(props)
        this.state={
          id_produit:'',
            produits:[],
            Oldproduits:[],
            reference:"",
            reference1:'' , quantite:'', stock:'',
            prix_unitaire:'',prix_vente:'',
            isTrue:true

            
            
        }
        this.editProduct=this.editProduct.bind(this);
        this.editProduct2=this.editProduct2.bind(this);
        this.Addproduct=this.Addproduct.bind(this);
        this.DeleteProduct=this.DeleteProduct.bind(this);
        this.changeReference=this.changeReference.bind(this);
        this.changeReference1=this.changeReference1.bind(this);
        this.changeQantite=this.changeQantite.bind(this);
        this.changeStock=this.changeStock.bind(this);
        this.changePU=this.changePU.bind(this);
        this.changePV=this. changePV.bind(this);
        this.getIcone=this.getIcone.bind(this)
        
    }

    changeReference1=(event)=>{
      this.setState({reference1 : event.target.value})
   }
   changeQantite=(event)=>{
      this.setState({quantite : event.target.value})
   }
   changeStock=(event)=>{
      this.setState({stock : event.target.value})
   }
   changePU=(event)=>{
      this.setState({prix_unitaire : event.target.value})
   }
   changePV=(event)=>{
      this.setState({prix_vente : event.target.value})
   }
   
    //ADD PRODUCTS
    Addproduct(){
      let produit ={reference:this.state.reference1,quantite:this.state.quantite,stock:this.state.stock,prix_unitaire:this.state.prix_unitaire,prix_vente:this.state.prix_vente }
      console.log(JSON.stringify(produit))
      produitServices.addProduct(produit).then(res=>{
        this.setState({reference1:'',quantite:'',stock:'',prix_unitaire:'',prix_vente:''})
        alert('Produit Ajouté  ')
        produitServices.getAllproduits().then((res) =>{
        this.setState({produits: res.data});
         this.setState({Oldproduits: res.data});
          
      })
        this.props.history.push("/products")})
        .catch((err) => {
           alert("Vérifier vos données ! ");
           
         });
    }

    //EDIT 
    editProduct(id){
      produitServices.getProductById(id).then((res)=>{
        let product =res.data;
        this.setState({reference1:product.reference,
            quantite:product.quantite,
            stock:product.stock,
            prix_unitaire:product.prix_unitaire,
            prix_vente:product.prix_vente,
            isTrue:false,
            id_produit:id

        })
    })
    }
    editProduct2(){
      let produit ={reference:this.state.reference1,quantite:this.state.quantite,stock:this.state.stock,prix_unitaire:this.state.prix_unitaire,prix_vente:this.state.prix_vente }
      if( window.confirm("Êtes-vous sûr de vouloir Modifier cet élément?")){
        produitServices.updateProduct(produit,this.state.id_produit).then(res=>{
          this.setState({reference1:'',quantite:'',stock:'',prix_unitaire:'',prix_vente:'',isTrue:true})
          produitServices.getAllproduits().then((res) =>{
            this.setState({produits: res.data});
             this.setState({Oldproduits: res.data});
              
          })
          alert('Produit modifié !')
          })
           
        }
        else{
           alert('Modification annulée')
           this.props.history.push("/products")
           
        }

    }
   
    //GETALL
    componentDidMount(){
      if(!sessionStorage.getItem('login')){
        this.props.history.push('/')
      }
    produitServices.getAllproduits().then((res) =>{
        this.setState({produits: res.data});
        this.setState({Oldproduits: res.data});
        
    })
    .catch((err) => {
        console.error(err);
        alert("Une erreur s'est produite lors de la récupération des produits.");
      });
    }

    //DELETE
    DeleteProduct(id){
    if(window.confirm("Êtes-vous sûr de vouloir supprimer cet élément?"))
    console.log(id)
    produitServices.deleteProduct(id).then((res)=>{
        this.setState({produits: this.state.produits.filter(produit => produit.id_produit !== id)})
    })
    
    }

    //SEARCH
    changeReference=(event)=>{
      this.setState({
        reference: event.target.value
      }, () => {
        if (this.state.reference === '') {
          this.setState({ produits: this.state.Oldproduits });
        } else {
          this.setState({
            produits: this.state.produits.filter(
              (produit) => produit.reference.toLowerCase().includes(this.state.reference.toLowerCase())
            )
          });
        }
      });}

//GENERATE PDF
pdf(){
  produitServices.pdf();
}

getIcone(){
  if (this.state.isTrue){
    return <GrAdd style={{fontSize:25}}onClick={this.Addproduct}/>
  }
  else{
    return <AiFillEdit style={{fontSize:25}} onClick={()=> this.editProduct2(this.state.id_produit)}/>
  }
}

  render() {
    return (

      <div>
         <Helmet>
        <title>produits</title>
      </Helmet>
      <div className='main'>
              <Navbar/> 
      <div className='body'>
        <h2 className='titre'> Gérer le stock de produits</h2>

        <div className=''> 
        <button className='imprimer_btn' onClick={()=>this.pdf()}>Imprimer</button>
        </div>

        <div className='search_barre'>
        <input type="text"  name='reference' className='form-control' placeholder='Chercher par reference'  onKeyUp={this.changeReference}/>
        <button className='search_icon'>
        <FiSearch />
        </button>
        </div>
      
        <div className='mytable'>
            <table className='table table-striped'>
                <thead>
                <tr>
                    <th>Reference</th>
                    <th>Quantite</th>
                    <th>Stock</th>
                    <th>Prix Unitaire</th>
                    <th>Prix de Vente</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr>
         
          
          <td><input type="text" className='form-control' name='reference' placeholder='REFERENCE' value={this.state.reference1} onChange={this.changeReference1}/></td>
          <td> <input type="text" className='form-control' name='quantite' placeholder='QUANTITE'value={this.state.quantite} onChange={this.changeQantite}/></td>
          <td><input type="text" className='form-control' name='stokc' placeholder='STOCK'value={this.state.stock} onChange={this.changeStock}/></td>
          <td><input type="text" className='form-control' name='prix_unitaire' placeholder='PRIX UNITAIRE'value={this.state.prix_unitaire} onChange={this.changePU}/></td>
          <td><input type="text" className='form-control' name='prix_vente' placeholder='PRIX VENTE' value={this.state.prix_vente} onChange={this.changePV}/></td>
          <td>{this.getIcone()}</td>

        </tr>
                {this.state.produits.length === 0 ? (
    <tr>
      <td colSpan="6">Aucun produit disponible</td>
    </tr>
  ) : (
    this.state.produits.map((produit) => (
      <tr key={produit.id_produit}>
        <td>{produit.reference}</td>
        <td>{produit.quantite}</td>
        <td>{produit.stock}</td>
        <td>{parseFloat(produit.prix_unitaire).toFixed(2)}</td>
        <td>{parseFloat(produit.prix_vente).toFixed(2)}</td>
        <td>
          
           <AiFillEdit style={{fontSize:21,marginRight: '5px',Color:'#3C486B'}} onClick={() => this.editProduct(produit.id_produit)} />
            <AiFillDelete style={{fontSize:21}} onClick={() => this.DeleteProduct(produit.id_produit)}/>
          
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
