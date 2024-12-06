import http from './httpServices'

const urlSignUp = "https://api.escuelajs.co"


export const apiSignup = async (input) => {
    try {
        const response = await http.Post(`${urlSignUp}/api/v1/users/`, input)
        return response.data;
    }


    catch (error) {
        console.error("error", error)
    }
}