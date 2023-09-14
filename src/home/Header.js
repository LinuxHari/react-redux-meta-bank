import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
    <nav>
        <div className="container">
            <h1>Bank of Meta</h1>
            <ul>
                <li><Link to="/" className='link'>Home</Link></li>
                <li><Link to="/deposit" className='link'>Deposit/Withdraw</Link></li>
            </ul>
            <Link to="/login" className='link'>Login</Link>
        </div>
    </nav>
    </header>
  )
}

export default Header