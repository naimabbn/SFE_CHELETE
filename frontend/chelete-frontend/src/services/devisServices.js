import axios from 'axios'

const devis_API_url='http://localhost:8080/chelete/devis/devis'
const service_API_url='http://localhost:8080/chelete/dservice/services'
const services_API_url='http://localhost:8080/chelete/dservice/service'

class devisServices{

    // DevisMETHODS
    getAll(){
        return axios.get(devis_API_url)
    }

     add(devis){
        return axios.post(devis_API_url,devis)
    }


    
    getById(id){
        return axios.get(devis_API_url+'/'+id)
    }


    update(devis,id){
        return axios.put(devis_API_url+'/'+id,devis)
    }

    delete(id){
        return axios.delete(devis_API_url+'/'+id)
    }





    //DEVIS SERVICES METHODS






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
    generatedevis(id){
        return axios.get("http://localhost:8080/chelete/dservice/pdf/"+id, { responseType: 'blob' })
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

export default new devisServices()