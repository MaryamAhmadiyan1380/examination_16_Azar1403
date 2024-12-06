import http from './httpServices'

const urlCategories = "https://api.escuelajs.co"


 const apiCategories = async (input) => {
    try {
        const response = await http.get(`${urlCategories}/api/v1/categories`, input)
        return response.data;
    }


    catch (error) {
        console.error("error", error)
    }
}
export default apiCategories;