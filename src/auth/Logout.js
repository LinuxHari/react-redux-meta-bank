import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const apiPoint = 'http://localhost:8000/logout'
const Logout = () => {
  const navigate = useNavigate()
  useEffect(() => {
   const signOut = async() => {
      try{
        await axios.post(apiPoint)
        localStorage.clear()
        navigate('/login')
      } catch(error){
        console.log(error)
        navigate('/login')
      }
    }
    signOut()
  },[navigate])
  return null
}

export default Logout