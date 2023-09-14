import { configureStore } from "@reduxjs/toolkit"
import loginSlice from "../features/loginSlice"
import actionSlice from "../features/actionSlice"

export const store = configureStore({
    reducer:{
        login:loginSlice,
        action:actionSlice
    }
})