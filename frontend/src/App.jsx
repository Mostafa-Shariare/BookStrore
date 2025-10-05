import { useState } from 'react'
import Home from './pages/Home'
import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AllBooks from './pages/AllBooks'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Profile from './pages/Profile'


function App() {

  return (
    <div>
      <Router>

        <Navbar />

        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/all-books' element={<AllBooks />} />
          <Route path='/cart' element={< Cart/>} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Login' element={<Login />} />

        </Routes>

        <Footer />

      </Router>

    </div>
  )


}

export default App
