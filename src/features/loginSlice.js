import { createSlice } from "@reduxjs/toolkit"
import { userAuth } from "../auth/AuthApi"

export const initialState = {
    loginSuccess:false,
    loginError:null
}

const loginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{},
    extraReducers:{
        [userAuth.fulfilled]: (state) => {
            state.loginSuccess = true
            state.loginError = null
        },
        [userAuth.rejected]: (state,{payload}) => {
            state.loginError = payload
            state.loginSuccess = false
        }
    }
})

export default loginSlice.reducer