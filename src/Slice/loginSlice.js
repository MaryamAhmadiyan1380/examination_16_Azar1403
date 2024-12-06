import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    token : null,
    username : null,
    email : null,
}
 const loginSlice = createSlice({
  name : "login",
  initialState,
  reducers : {

      set_usernam :(state , action) => {
        state.username = action.payload;
      },
      setToken :(state , action) => {
          state.token = action.payload;
      }
  }
})
export const { setToken ,set_usernam  } = loginSlice.actions;
export default loginSlice.reducer;


