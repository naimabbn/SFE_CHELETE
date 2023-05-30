import React, { Component } from 'react'
import adminServices from '../../services/adminServices'
import { withRouter } from 'react-router-dom';
import Navbar from '../navbar'
import { Helmet } from 'react-helmet';
export default class editAdmin extends Component {
  constructor(props) {
    super(props)
    this.state={
          admin:[],
          login:'',
          password:'',
          newpassword:'',
          confirmnewpassword:''
    }
  this.changeLogin=this.changeLogin.bind(this)
  this.changePassword=this.changePassword.bind(this)
  this.changeNewPassword=this.changeNewPassword.bind(this)
  this.changeConfirmNewPassword=this.changeConfirmNewPassword.bind(this)
  this.editAdmin=this.editAdmin.bind(this)


}

//LOGIN
changeLogin(event){
  event.preventDefault();
  this.setState({login : event.target.value})
}


//PASSWORD
changePassword(event){
  event.preventDefault();
  this.setState({password : event.target.value})

}

//NEW PASSWORD
changeNewPassword(event){
  event.preventDefault();
  this.setState({newpassword : event.target.value})

}

//CONFIRM NEW PASSWORD
changeConfirmNewPassword(event){
  event.preventDefault();
  this.setState({confirmnewpassword : event.target.value})

}

componentDidMount(){
  if(!sessionStorage.getItem('login')){
    this.props.history.push('/')
  }
  this.setState({login : sessionStorage.getItem('login')})
}

//EDIT
editAdmin(){
  if(this.state.password===sessionStorage.getItem('password')){
    if (this.state.confirmnewpassword===this.state.newpassword){
      let newAdmin ={login:this.state.login,password:this.state.confirmnewpassword }
      adminServices.editAdmin(sessionStorage.getItem('id_admin'),newAdmin).then(()=>{
        alert('admin modifer')
        this.props.history.push('/')
      })
    }
    else{
      alert('Vérifier votre nouveau mot de passe')
    }
  }
  else{ 
    alert('Vérifier votre mot de passe')
  }
}
 
  


  render() {
    return (
      <div>
      <Helmet>
     <title>compte</title>
   </Helmet>
   <div className='main'>
           <Navbar/> 
   <div className='body'>
     <h2 className='titre'> Gérer mon compte - Modifier le mot de passe</h2>
       
       <div class="" style={{width:'90%',marginLeft:'5%'}}>
      <div class="">
        <div class="">
          <div class="card mt-5"> 
            <div class="card-body">
                <div class="mb-3">    

      <input type="text" className='form-control'  style={{marginBottom:'18px', height:'60px'}}  name='login' placeholder='Login' value={this.state.login} onChange={this.changeLogin}/>
       
      <input type="password" className='form-control' style={{marginBottom:'18px',height:'60px'}}   name='password' placeholder='Mot de passe'  onChange={this.changePassword}/>
       
      <input type="password" className='form-control' style={{marginBottom:'18px',height:'60px'}}  name='password' placeholder='Nouveau mot de passe'  onChange={this.changeNewPassword}/>
      
      <input type="password"className='form-control'  style={{marginBottom:'15px',height:'60px'}}  name='password' placeholder='Confirmer ot de passe'  onChange={this.changeConfirmNewPassword}/>

      <input type="submit" className='btn btn-primary'  style={{marginBottom:'15px', background:'#3C486B' ,border:'1px solid #3C486B'}}  value='Modifier' onClick={this.editAdmin} />

       </div>
      
        </div>
      </div>
    </div>
  </div>
</div>
       </div> </div> 
       </div>
    )
  }
}