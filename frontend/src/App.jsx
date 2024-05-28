import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/placeOrder'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import Verify from './pages/Verify/verify'
import MyOrders from './pages/MyOrders/MyOrders'





function App() {
  const [count, setCount] = useState(0)

  const [showLogin,setShowLogin]=useState(false)

  return (

    <>

    {showLogin?<LoginPopUp setShowLogin={setShowLogin}/>:<></>}

    
      <div className='app'>

        <Navbar setShowLogin={setShowLogin}/>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/myorders' element={<MyOrders/>}/>
        </Routes>




      </div>

      <Footer />
    </>

  )
}

export default App
