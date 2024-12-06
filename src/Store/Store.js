import {configureStore} from '@reduxjs/toolkit';

import loginSlice from '../Slice/loginSlice';

 const store = configureStore({
    reducer : {
        reducer : {
            token : loginSlice
        }
    }
})
export default store;



