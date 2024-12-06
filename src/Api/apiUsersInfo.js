import http from '../Api/httpServices'

const urlUser = "https://api.escuelajs.co"

const apiUserInfo = async(info) => {
    try{
        const response = await http.get(`${urlUser}/api/v1/users`,info );
        return response.data;
    }
    catch(error){
        console.log("error: ", error);
        throw error;
    }
   
}
export default apiUserInfo;