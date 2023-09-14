import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

export const action = createAsyncThunk(
    '/action',
    async({amount,location},{rejectWithValue}) => {
        const apiPoint = `http://localhost:8000${location}`
        const req = {
            Headers:{'Content-Type':'application/json'}
        }
        try{
            const {data} = await axios.post(apiPoint,{amount},req)
            localStorage.setItem('balance',data.balance)
            return data
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