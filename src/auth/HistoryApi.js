import axios from "axios"

const apiPoint = 'http://localhost:8000/history'
export const userHistory = async() => {
    axios.defaults.withCredentials = true
        try{
            const userHistory = await axios.get(apiPoint)
            return userHistory.data
        } catch(error){
            if(error.response && error.response.data.message)
                console.log(error.response.data.message)
            else
                console.log(error.message)
        }
    }