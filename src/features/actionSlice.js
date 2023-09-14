import { createSlice } from "@reduxjs/toolkit"
import { action } from "../auth/ActionApi"

export const initialState = {
    balance: null,
    actionSuccess: false,
    actionError: null
}

const actionSlice = createSlice({
    name:'action',
    initialState,
    reducers:{},
    extraReducers:{
        [action.fulfilled]: (state,{payload}) => {
            state.actionSuccess = true
            state.balance = payload.balance
            state.actionError = null
        },
        [action.rejected]: (state,{payload}) => {
            state.actionError = payload
            state.actionSuccess = true
        }
    }
})

export default actionSlice.reducer