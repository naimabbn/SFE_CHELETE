import axios from 'axios'

const produit_API_url='http://localhost:8080/chelete/prod/products'
class produitServices{

    // PRODUCTS METHODS
    getAllproduits(){
        return axios.get(produit_API_url)
    }

    addProduct(produit){
        return axios.post(produit_API_url,produit)
    }
    getProductById(id){
        return axios.get(produit_API_url+'/'+id)
    }
    updateProduct(product,id){
        return axios.put(produit_API_url+'/'+id,product)
    }
    deleteProduct(id){
        return axios.delete(produit_API_url+'/'+id)
    }
    searchProduct(reference){
        return axios.post(produit_API_url+'/'+reference)
    }
    pdf(){
        return axios.get("http://localhost:8080/chelete/prod/pdf", { responseType: 'blob' })
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

export default new produitServices()