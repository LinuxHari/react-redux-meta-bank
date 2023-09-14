import { useEffect, useState } from 'react'
import '../styles/History.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const HistoryContent = () => {
const [actionHistory,setUserHistory] = useState([{date:'10-20-2003',action:'deposit',amount:2000,status:'completed'}])
const navigate = useNavigate()

axios.defaults.withCredentials = true

 useEffect(() => {
        const isAuthenticated = () => {
          axios.get('http://localhost:8000/login').then((response)=>{
            if(!response.data.isLoggedIn)
              navigate('/')
        })}
        isAuthenticated()
    
      },[navigate])

  useEffect(() => {
    const fetchData = async() => {
        const apiPoint = 'http://localhost:8000/history'
        try{
            const userHistory = await axios.get(apiPoint)
            setUserHistory(userHistory.data)
        } catch(error){
            if(error.response && error.response.data.message)
                console.log(error.response.data.message)
            else
                console.log(error.message)
        }
    }
    fetchData()
  },[setUserHistory])
  return (
    <section className="main">
    <h1>History</h1>
    <table>
        <tbody>
            <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
            </tr>
             {actionHistory.map((action) => {
               return(<tr key={action._id}>
                <td>{action.date}</td>
                <td>{action.action}</td>
                <td>{action.amount}</td>
                <td>{action.status}</td>
                </tr>)
                })}
        </tbody>
    </table>
    </section>
  )
}

export default HistoryContent