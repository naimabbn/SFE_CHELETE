import axios from 'axios'

const facture_API_url='http://localhost:8080/chelete/facture/factures'
const service_API_url='http://localhost:8080/chelete/fservice/services'
const services_API_url='http://localhost:8080/chelete/fservice/service'

class factureServices{

    // FACTURES METHODS
    getAllFactures(){
        return axios.get(facture_API_url)
    }

     addFacture(facture){
        return axios.post(facture_API_url,facture)
    }


    
    getFactureById(id){
        return axios.get(facture_API_url+'/'+id)
    }

    getFactureAccuser(id){
        return axios.get(facture_API_url+'/client/'+id)
    }

    updateFacture(facture,id){
        return axios.put(facture_API_url+'/'+id,facture)
    }

    deleteFacture(id){
        return axios.delete(facture_API_url+'/'+id)
    }

    fichecreditpdf(id){
        return axios.get("http://localhost:8080/chelete/facture/fichecredit/"+id, { responseType: 'blob' })
        .then(response => {
          //Create a Blob from the PDF Stream
          const file = new Blob([response.data], {type: 'application/pdf'});
          //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
          //Open the URL on new Window
          window.open(fileURL);
        })
        .catch(error => {
          console.log(error);
        });
    }
    //FACTURE SERVICES METHODS

    getServicesByIdFacture(id){
        return axios.get(service_API_url+'/'+id)
    }

    addService(service){
        return axios.post(service_API_url,service)
    }

    deleteService(id){
        return axios.delete(service_API_url+'/'+id)
    }

    getServiceById(id){
        return axios.get(services_API_url+'/'+id)
    }
    updateService(service,id){
        return axios.put(service_API_url+'/'+id,service)
    }
    deleteAllByFacID(id){
        return axios.delete(services_API_url+'/'+id)
    }
    
    generateFacture(id){
        return axios.get("http://localhost:8080/chelete/fservice/pdf/"+id, { responseType: 'blob' })
        .then(response => {
          //Create a Blob from the PDF Stream
          const file = new Blob([response.data], {type: 'application/pdf'});
          //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
          //Open the URL on new Window
          window.open(fileURL);
        })
        .catch(error => {
          console.log(error);
        });
    }


    
}

export default new factureServices()