import React, { Component } from 'react'
import adminServices from '../../services/adminServices'
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default class login extends Component {
  constructor(props) {
    super(props)
    this.state={
      lettre:'',
          admin:[],
          login:'',
          password:''
    }
  this.changeLogin=this.changeLogin.bind(this)
  this.changePassword=this.changePassword.bind(this)
  this.connexion=this.connexion.bind(this)
}


componentDidMount(){
console.log( '77'+convertNumberToFrenchWords(177075))

  adminServices.getAllAdmins().then((res) =>{
    this.setState({admin: res.data});
  })
.catch((err) => {
  console.error(err);
  alert("Une erreur s'est produite lors de la récupération des admins.");
});
}

//LOGIN
changeLogin(event){
  event.preventDefault();
  this.setState({login : event.target.value})
  console.log(this.state.login)
}


//PASSWORD
changePassword(event){
  event.preventDefault();
  this.setState({password : event.target.value})
  console.log(this.state.password)
}

//CONNEXION
connexion(){
  const foundAdmin = this.state.admin.map(admin => {
    if(admin.login === this.state.login && admin.password === this.state.password) {
      sessionStorage.setItem('id_admin',admin.id)
      return admin;
    }
    return null;
}).filter(admin => admin !== null);
if(foundAdmin.length > 0) {
  sessionStorage.setItem('login',this.state.login)
  sessionStorage.setItem('password',this.state.password)
  
  this.props.history.push('/acceuil')
}
else{
  this.props.history.push('/')
  alert('Votre login ou mot de passe est inccorect')
  


}
}

  render() {
    return (
      
      <div className='login'>
        <Helmet>
        <title>Chelete App</title>
      </Helmet>
      <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card mt-5">
  
              <h3 class="" style={{color:'#3C486B'}}>Chelete App</h3>
           
            <div class="card-body">
             
                <div class="mb-3">
        
      
        
       <input type="text" className='form-control' name='login' placeholder='LOGIN' style={{marginBottom:'15px'}}  onChange={this.changeLogin}/>
       
       <input type="password" className='form-control'style={{marginBottom:'15px'}} name='password' placeholder='MOT DE PASSE'  onChange={this.changePassword}/>
       <br />
       <input type="submit"  class="btn btn-secondary"  style={{marginBottom:'15px', background:'#3C486B' ,border:'1px solid #3C486B'}} value='Connexion' onClick={this.connexion} />
       </div>
      
        </div>
      </div>
    </div>
  </div>
</div>
</div>
    )
  }
}
 function verifier(number){
   let num=number % 100;
  console.log(num)
  //convertNumberToFrenchWords(number)
}
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