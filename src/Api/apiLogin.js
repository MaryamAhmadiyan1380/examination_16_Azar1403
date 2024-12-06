import http from '../Api/httpServices'

const urlLogin = "https://api.escuelajs.co"

export const apiLogin = async(input) => {
    try{
       const response = await http.Post(`${urlLogin}/api/v1/auth/login`,input)
        return response.data; 
    }
    catch(error){
        console.error('Error during login:', error)
        throw error;
    }
}
