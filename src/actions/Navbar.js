import {Link} from 'react-router-dom'
import '../styles/User.css'
import { useSelector } from 'react-redux'
const Navbar = () => {
  const username = localStorage.getItem('username')
  const balance = localStorage.getItem('balance')
  const newBalance = useSelector(state => state.action.balance)
  
  return (
    <nav>
        <h3>Hello {username}</h3>
        <ul>
            <li><Link to="/deposit">Deposit</Link></li>
            <li><Link to="/withdraw">Withdraw</Link></li>
            <li><Link to="/history">History</Link></li>
            <li><Link to="/logout">Logout</Link></li>
        </ul>
        <p>Balance: ₹{newBalance?newBalance:balance}</p>
    </nav>
  )
}

export default Navbar