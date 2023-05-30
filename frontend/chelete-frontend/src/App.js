

import {BrowserRouter as Router ,Route ,useHistory, Switch} from 'react-router-dom'
import './App.css'; 

import Allproducts  from  './component/produit/Allproducts'
import login  from  './component/admin/login'
import editAdmin from  './component/admin/editAdmin'
import Allclients_facture from './component/client/Allclients_facture';
import Allclients from './component/client/Allclients';
import Allclients_devis from './component/client/Allclients_devis';
import Allclients_fiche from './component/client/Allclients_fiche';
import AllFactures from './component/facture/Allfactures';
import addFacture from './component/facture/addFacture';
import editfacture from './component/facture/editfacture';
import AllDevis from './component/devis/allDevis';
import addDevis from './component/devis/addDevis';
import editDevis from './component/devis/editDevis';
import deconnexion from './component/admin/deconnexion';
import ficheCredit from './component/facture/ficheCredit';
import navbar from './component/navbar';
import home from './component/home';

function App() {
  
  return (
    <div className="">
      
      <Router>
        <Switch>
            <Route path="/"  exact component={login}></Route>
            <Route path="/nav"  exact component={navbar}></Route>
            <Route path="/acceuil"  exact component={home}></Route>
            <Route path='/editadmin' component={editAdmin}></Route>
            <Route path='/deconnexion' component={deconnexion}></Route>
            <Route path="/products"  exact component={Allproducts}></Route>
            <Route path='/clients' component={Allclients}></Route>
            <Route path='/factureclient' component={Allclients_facture}></Route>
            <Route path='/devisclient' component={Allclients_devis}></Route>
            <Route path='/creditclient' component={Allclients_fiche}></Route>
            <Route path='/factures' component={AllFactures}></Route>
            <Route path='/addfacture' component={addFacture}></Route>
            <Route path='/editfacture/:id' component={editfacture}></Route>
            <Route path='/fichecredit/:id' component={ficheCredit}></Route>
            <Route path='/devis' component={AllDevis}></Route>
            <Route path='/addDevis' component={addDevis}></Route>
            <Route path='/editdevis/:id' component={editDevis}></Route>
          </Switch> 
      </Router>
    </div>
  );
}

export default App;
