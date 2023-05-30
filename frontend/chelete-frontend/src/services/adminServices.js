import axios from 'axios'

const admin_API_url='http://localhost:8080/chelete/admin/admins'
class adminServices{

    // PRODUCTS METHODS


    getAllAdmins(){
        return axios.get(admin_API_url)  
    }
    editAdmin(id,admin){
        return axios.put(admin_API_url+'/'+id,admin)

    }






}
export default new adminServices()