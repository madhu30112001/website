import React, { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from './components/LoginPopup/Login';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import Footer from './components/Footer/Footer';

const App = () => {

  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
    {showLogin? <Login setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>

      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App