import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

export const userAuth = createAsyncThunk(
    '/login',
    async({username,nid,location},{rejectWithValue}) => {
        const apiPoint = `http://localhost:8000${location}`
        const req = {
            Headers:{'Content-Type':'application/json'}
        }
        try{
            const {data} = await axios.post(apiPoint,{username,nid},req)
            localStorage.setItem('username',data.username)
            localStorage.setItem('balance',data.balance)
        }
        catch(error){
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            }
            else{
                return rejectWithValue(error.message)
            }
        }
    }
)