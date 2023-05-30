import axios from 'axios'

const client_API_url='http://localhost:8080/chelete/client/clients'
class clientServices{

    // CLIENTS METHODS
    getAllclients(){
        return axios.get(client_API_url)
    }

    addClient(client){
        return axios.post(client_API_url,client)
    }


    deleteClient(id){
        return axios.delete(client_API_url+'/'+id)
    }

    updateClient(client,id){
        return axios.put(client_API_url+'/'+id,client)
    }


    getClientById(id){
        return axios.get(client_API_url+'/'+id)
    }
   

    pdf(){
        return axios.get("http://localhost:8080/chelete/client/pdf", { responseType: 'blob' })
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

export default new clientServices()