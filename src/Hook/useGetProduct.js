import {useMutation} from 'react-query'
import apiProducts from '../Api/apiProducts'

const useGetProduct = () => {
    return useMutation({
        mutationFn:apiProducts
    })
}
export default useGetProduct;