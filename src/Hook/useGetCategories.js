import {useMutation} from 'react-query';
import apiCategories from '../Api/apiCategories';

const useGetCategories = () => {
    return useMutation({
        mutationFn:apiCategories
    })
}
export default useGetCategories;