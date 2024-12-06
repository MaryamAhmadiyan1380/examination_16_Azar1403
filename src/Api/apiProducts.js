import http from './httpServices'

const urlProducts = " https://api.escuelajs.co"


 const apiProducts = async (input) => {
    try {
        const response = await http.get(`${urlProducts}/api/v1/products`, input)
        return response.data;
    }


    catch (error) {
        console.error("error", error)
    }
}
export default apiProducts;