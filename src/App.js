import Home from './home/Home';
import Login from './auth/Login';
import Deposit from './actions/Deposit'
import Withdraw from './actions/Withdraw'
import History from './actions/History';

import { Route,Routes } from 'react-router-dom';
import Logout from './auth/Logout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/deposit" element={<Deposit/>}/>
      <Route path="/withdraw" element={<Withdraw/>}/>
      <Route path="/history" element={<History/>}/>
      <Route path="*" element={<Logout/>}/>
    </Routes>
  );
}

export default App;
