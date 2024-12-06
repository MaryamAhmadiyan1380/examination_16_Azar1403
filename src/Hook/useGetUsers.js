import {useMutation} from 'react-query';
import apiUsersInfo from '../Api/apiUsersInfo';

const useGetUsers = () => {
    return useMutation({
        mutationFn:apiUsersInfo
    })
}
export default useGetUsers;

